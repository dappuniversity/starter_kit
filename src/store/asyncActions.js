import { setupWeb3, web3LoadingError, addEthereumAccounts, RegisterProperty, setupContract, EnablePropertySale, PropertyPricing,property_detail } from './actions';
import Web3 from 'web3';
import {useState} from 'react'

//import {SMART_ESTATE_ABI, SMART_ESTATE_ADDRESS} from '../components/utils/SmartEstate'
import SmartEstate from "../abis/SmartEstate.json";

export const loadBlockchain = async (dispatch) => {
    
    try {
        console.log("web3 =", Web3);
        console.log("web3.givenProvider = ", Web3.givenProvider);
        if (Web3.givenProvider) {
            const web3 = new Web3(Web3.givenProvider);
            await Web3.givenProvider.enable();
            dispatch(setupWeb3(web3));
           //  const contract = new web3.eth.contract(SMART_ESTATE_ABI,SMART_ESTATE_ADDRESS)
            // const networkId = await web3.eth.net.getId()
            //     .then(console.log(networkId))
            // const contractAddress=SmartEstate.networks[networkId].address
            // const networkData = SmartEstate.networks[networkId]
            //console.log(networkData)
           
           // 0x9f321623df851eB949e89c0E3eb5CE601b176c2B
             const address = "0xEa723Df520923c9c6151CbF5dd5e96EFB1a36E4F"
            const contract = new web3.eth.Contract(SmartEstate.abi, address)
            dispatch(setupContract(contract));
            const accounts = await web3.eth.getAccounts();
            dispatch(addEthereumAccounts(accounts))
           
             const events=  contract ? await contract.getPastEvents('property_detail',{fromBlock: 0, toBlock: "latest"}) : null;

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

    const receipt = await contract.methods.RegisterProperty(property._propertyAddress, property._city, property._room, property._area, property._priceInEther, property._propertyType, property._saleStatus, property._tokenUri).send({ from: accounts[0] });
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

export const property_Detail = async (contract)=>{
    
    console.log("before transaction");
    //,(err,event)=>{ console.log(event[0].returnValues)}
    const receipt =contract ? await contract.getPastEvents('property_detail',{fromBlock: 0, toBlock: "latest"}) : null;
                //event[0].returnValues
        //console.log(events);
     console.log("after transaction", receipt);
     
       // dispatch(property_detail(events));
    return receipt;
}



