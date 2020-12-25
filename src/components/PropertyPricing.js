import React,{useState} from 'react'
import { useStore } from '../context/GlobalState'
import { propertyPricing } from '../store/asyncActions'
import Loader from '../images/loader.gif'

export function PropertyPricing() {

    const [{ contract, accounts }, dispatch] = useStore();
    const [isTransactionInProcess, setTransactionInProcess] = useState(false)
    const [isTransactionSuccessful, setTransactionSuccessful] = useState(true)
    const [transactionError, setTransactionError] = useState("")
    const [PropertyId_TokenId, setPropertyId_TokenId] = useState(0)

    const onSubmit = async (e) => {
        e.preventDefault();
        setTransactionSuccessful(true)
        setTransactionError("")
        try {
            await propertyPricing(contract, accounts, PropertyId_TokenId, dispatch)
            console.log(PropertyId_TokenId)
            setTransactionInProcess(false)
            setTransactionSuccessful(true)
        } catch (error) {
            console.log(error)
            setTransactionInProcess(false);
            setTransactionSuccessful(false)
            setTransactionError(error.message)
        }
    }

    return (
        <>
            <hr />
            <h3>Property Pricing{isTransactionInProcess && <img width="40px" src={Loader} alt="Loading...." />}</h3>
            {!isTransactionSuccessful && <div style={{ color: "red" }}>{transactionError}</div>}
            <form onSubmit={onSubmit} className="form">
                <div>
                    <label htmlFor="TokenId" >Enter Token Id</label>
                    <input type="text" value={PropertyId_TokenId} onChange={(e) => setPropertyId_TokenId(e.target.value)} placeholder="Enter Property token Id" />

                </div>
                {
                    isTransactionInProcess ?
                        <div className="btn" style={{ background: "blue", color: "white" }}> Transaction in Process...</div> :
                        <div className="center">   <button className="btn" style={{ background: "blue", color: "white" }}> Price of Property</button></div>
                }
            </form>
                

        </>

    )
}
