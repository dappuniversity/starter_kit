import { setupWeb3, web3LoadingError, addEthereumAccounts, registerProperty, setupContract } from './actions';
import SmartEstate from '../abis/SmartEstate.json';
import Web3 from 'web3';

export const loadBlockchain = async (dispatch) => {
    try {
        console.log("web3 =", Web3);
        console.log("web3.givenProvider = ", Web3.givenProvider);
        if (Web3.givenProvider) {
            const web3 = new Web3(Web3.givenProvider);
            await Web3.givenProvider.enable();
            dispatch(setupWeb3(web3));
            const networkId = web3.eth.net.getId()
            const networkData = SmartEstate.networks[networkId]
            const contract = new web3.eth.Contract(SmartEstate.abi, networkData)
            dispatch(setupContract({ contract }));
            const accounts = await web3.eth.getAccounts();
            dispatch(addEthereumAccounts(accounts))

            console.log("Contract", contract)
            console.log("contract.methods", contract.methods);


        } else {
            dispatch(web3LoadingError("Please install an Ethereum-compatible browser or extension like Metamask to use this DAPP"))
        }
    }
    catch (error) {
        console.log("Error in loading Web3 = ", error);
        if (error.code === 4001)
            dispatch(web3LoadingError(error.message))
    }
}

export const registerPropertyAsync = async(contract,accounts,property,dispatch)=>{
    console.log("before transaction")
    const RegisterProperty = await contract.methods.registerProperty(property._propertyAddress,property._city,property._room,property._area,property._priceInEther,property._propertyType,property._saleStatus,property._tokenUri).send({from: accounts[0]});
    console.log("after transaction ", RegisterProperty)
    dispatch(registerProperty(property))
}
