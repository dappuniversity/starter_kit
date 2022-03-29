export const toWei = price => web3.utils.toWei(price.toString(), 'ether');
export const fromWei = price => Number(web3.utils.fromWei(price.toString(), 'ether'));
