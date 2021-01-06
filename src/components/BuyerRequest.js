import React, { useState } from 'react'
import Web3 from 'web3'
import { useStore } from '../context/GlobalState'
import { buyer_Request } from '../store/asyncActions';
import Loader from '../images/loader.gif'

function BuyerRequest({ PropertyId_TokenId }) {

    const [{ contract, accounts }, dispatch] = useStore();
    const [isTransactionInProcess, setTransactionInProcess] = useState(false)
    const [isTransactionSuccessful, setTransactionSuccessful] = useState(true)
    const [transactionError, setTransactionError] = useState("")

    const [value, setvalue] = useState(0)
    const onSubmit = async (e) => {
        e.preventDefault();
        setTransactionSuccessful(true)
        setTransactionError("")
        try {
            setTransactionInProcess(true)
            const newOffer = {
                PropertyId_TokenId,
                value
            }
//: Web3.utils.fromWei(value.toString(), 'Ether')
           const result = await buyer_Request(contract, accounts, newOffer, dispatch);
            console.log(result)
            setTransactionInProcess(false)
            setTransactionSuccessful(true)
            
        } catch (error) {
            console.log(error)
            setTransactionInProcess(false);
            setTransactionSuccessful(false)
            setTransactionError(error.message)
        }

    }

    return <div>
         <h3>Want to Bid?{isTransactionInProcess && <img width="40px" src={Loader} alt="Loading...." />}</h3>
            {!isTransactionSuccessful && <div style={{ color: "red" }}>{transactionError}</div>}
        <form onSubmit={onSubmit} >
            <div className="center">
            <input type="text" required onChange={(e) => setvalue(e.target.value)} />

            { isTransactionInProcess ?
                    <div className="btn" style={{ background: "blue", color: "white" }}> Transaction in Process...</div> :
                    <div className="center"> <button className="btn" style={{ background: "blue", color: "white" }}> Buy Request</button></div> 
            }
            </div>
        </form>
    </div>
}

export default BuyerRequest;