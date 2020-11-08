import { setupWeb3, web3LoadingError, addEthereumAccounts, RegisterProperty, setupContract,EnablePropertySale } from './actions';
import Web3 from 'web3';

//import {SMART_ESTATE_ABI, SMART_ESTATE_ADDRESS} from '../components/utils/SmartEstate'
import SmartEstate from "../abis/SmartEstate.json";

export const loadBlockchain = async (dispatch) => {
    try {

        //const [landCount, setlandCount] = useState({})
        console.log("web3 =", Web3);
        console.log("web3.givenProvider = ", Web3.givenProvider);
        if (Web3.givenProvider) {
            const web3 = new Web3(Web3.givenProvider);
            await Web3.givenProvider.enable();
            dispatch(setupWeb3(web3));
            //const contract = new web3.eth.contract(SMART_ESTATE_ABI,SMART_ESTATE_ADDRESS)
            //const networkId = web3.eth.net.getId()
            //const networkData = SmartEstate.networks[networkId]
            const address = "0x76Ca8fe3fF53727181Be18FE2f8c74F262df4b46"
            const contract = new web3.eth.Contract(SmartEstate.abi, address)
            dispatch(setupContract(contract));
            const accounts = await web3.eth.getAccounts();
            dispatch(addEthereumAccounts(accounts))
            console.log({ contract })
            console.log("Contract", contract)
            console.log("contract.methods", contract.methods);
            const landCount = await contract.methods.tokenId().call()
            //setlandCount(landCount)

            for (let i = 0; i <= landCount.length; i++) {
                const { _propertyAddress, _city, _room, _area, _priceInEther, _propertyType, _saleStatus, _tokenUri } = await contract.methods.property(i).call
                let propertyObj = {
                    _propertyAddress, _city, _room, _area, _priceInEther, _propertyType, _saleStatus, _tokenUri
                }
                dispatch(RegisterProperty(propertyObj));
                //dispatch(EnablePropertySale(tokenId))
            }

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

    const register_property = await contract.methods.RegisterProperty(property._propertyAddress, property._city, property._room, property._area, property._priceInEther, property._propertyType, property._saleStatus, property._tokenUri).send({ from: accounts[0] });
    console.log("after transaction ", register_property)
    dispatch(RegisterProperty(property))
}

export const enablePropertySale = async (contract, accounts, tokenId, dispatch) => {
    console.log("before transaction")
    const receipt = await contract.methods.EnablePropertySale(tokenId).send({ from: accounts[0] })
    console.log("after transaction ", receipt)
    dispatch(EnablePropertySale(tokenId))
}

// export const propertylist = async (contract,accounts,tokenId,dispatch) => {
//     console.log("before transaction")
//     const receipt = await contract.methods.PropertyList(tokenId).send({from:accounts[0]});
//     console.log("after transaction ", receipt)
//     dispatch(PropertyList(tokenId))
// }