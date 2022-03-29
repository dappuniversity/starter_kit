import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

export const toWei = (price: any) => web3.utils.toWei(String(price), 'ether');
export const fromWei = (price: any) => Number(web3.utils.fromWei(String(price), 'ether'));
