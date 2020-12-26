import { setupWeb3, web3LoadingError, addEthereumAccounts, RegisterProperty, setupContract, EnablePropertySale, PropertyPricing, Events } from './actions';
import Web3 from 'web3';
import SmartEstate from "../abis/SmartEstate.json";

export const loadBlockchain = async (dispatch) => {

    try {
        console.log("web3 =", Web3);
        console.log("web3.givenProvider = ", Web3.givenProvider);
        if (Web3.givenProvider) {
            const web3 = new Web3(Web3.givenProvider);
            await Web3.givenProvider.enable();
            dispatch(setupWeb3(web3));
            const address = "0xF10F322bf589b873B4C53bEef0ca644D32730b79"
            const contract = new web3.eth.Contract(SmartEstate.abi, address)
            dispatch(setupContract(contract));
            const accounts = await web3.eth.getAccounts();
            dispatch(addEthereumAccounts(accounts))

            const events = contract ? await contract.getPastEvents('property_detail', { fromBlock: 0, toBlock: "latest" }) : null;

            console.log(events)
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

export const registerPropertyAsync = async (contract, accounts, property, dispatch) => {
    console.log("before transaction")

    const receipt = await contract.methods.RegisterProperty(property._propertyAddress, property._city, property._room, property._area, property._priceInEther, property._propertyType, property._image, property._saleStatus, property._tokenUri).send({ from: accounts[0] });
    console.log("after transaction ", receipt)
    dispatch(RegisterProperty(property))
}

export const enablePropertySale = async (contract, accounts, tokenId, dispatch) => {
    console.log("before transaction")
    const receipt = await contract.methods.EnablePropertySale(tokenId).send({ from: accounts[0] })
    console.log("after transaction ", receipt)
    dispatch(EnablePropertySale(tokenId))
}

export const propertyPricing = async (contract, accounts, PropertyId_TokenId, dispatch) => {
    console.log("before transaction");
    const receipt = await contract.methods.PropertyPricing(PropertyId_TokenId).send({ from: accounts[0] })
    console.log("after trasnaction", receipt);
    dispatch(PropertyPricing(PropertyId_TokenId));
}

export const property_Detail = async (contract) => {

    console.log("before transaction");
    const receipt = contract ? await contract.getPastEvents('property_detail', { fromBlock: 0, toBlock: "latest" }) : null;
    console.log("after transaction");

    return receipt;
}



