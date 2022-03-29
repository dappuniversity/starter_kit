import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

import web3config from 'config/web3';
import { CrumbType } from 'types';

import Bread from '../../backend/abis/Bread.json';
import Crumbs from '../../backend/abis/Crumbs.json';

class CrumbsService {
    static web3Options = { transactionConfirmationBlocks: 1 };

    static UndefinedAccountError = new Error('Account is not defined');

    web3: Web3;

    breadContract: Contract;

    crumbsContract: Contract;

    account: {
        privateKey: string,
        address: string
    };

    constructor(
      web3Provider: any = web3config.DEFAULT_PROVIDER,
      chainId: number = web3config.DEFAULT_CHAIN_ID,
    ) {
      this.web3 = new Web3(web3Provider, undefined, CrumbsService.web3Options);

      const breadNetworkData = Bread.networks[chainId];
      const crumbsNetworkData = Crumbs.networks[chainId];

      this.breadContract = new this.web3.eth.Contract(Bread.abi, breadNetworkData?.address);
      this.crumbsContract = new this.web3.eth.Contract(Crumbs.abi, crumbsNetworkData?.address);

      const deployerAccount = this.web3.eth.accounts.privateKeyToAccount(web3config.DEPLOYER_PRIVATE_KEY).address;

      this.account = {
        privateKey: web3config.DEPLOYER_PRIVATE_KEY,
        address: deployerAccount,
      };

      this.getCrumbs.bind(this);
      this.createCrumb.bind(this);
    }

    getCrumbs = (domain: string): Promise<CrumbType[]> => this.crumbsContract.methods.getCrumbs(domain).call()

    createCrumb = (
      sessionId: string,
      domain: string,
      account: string,
    ): Promise<boolean> => {
      if (!this.account?.address) throw (CrumbsService.UndefinedAccountError);

      const createCrumbTx = this.crumbsContract.methods.createCrumb(sessionId, domain, account);

      return new Promise<boolean>((resolve, reject) => createCrumbTx.estimateGas({ from: this.account.address })
        .then((gasEstimate: number) => {
          const options = {
            to: this.crumbsContract.address, // target contract address
            from: this.account.address,
            data: createCrumbTx.encodeABI(),
            gas: this.web3.utils.toHex(gasEstimate),
          };

          return this.web3.eth.accounts.signTransaction(options, web3config.DEPLOYER_PRIVATE_KEY);
        }).then((signedTx: any) => this.web3.eth.sendSignedTransaction(signedTx.rawTransaction)
          .on('confirmation', () => resolve(true))
          .on('error', reject))
        .catch(reject));
    };
}

export default new CrumbsService();

export {
  CrumbsService,
};
