import React, { useState } from 'react'
import { useStore } from '../context/GlobalState'
import { enablePropertySale } from '../store/asyncActions'
import Loader from '../images/loader.gif'

function EnablePropertySale() {

    const [{ contract, accounts }, dispatch] = useStore();
    const [isTransactionInProcess, setTransactionInProcess] = useState(false)
    const [isTransactionSuccessful, setTransactionSuccessful] = useState(true)
    const [transactionError, setTransactionError] = useState("")
    const [TokenId, setTokenId] = useState(0)

    const onSubmit = async (e) => {
        e.preventDefault();
        setTransactionSuccessful(true)
        setTransactionError("")
        try {
            await enablePropertySale(contract, accounts, TokenId, dispatch)
            console.log(TokenId)
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
            <h3>Enable Property Sale{isTransactionInProcess && <img width="40px" src={Loader} alt="Loading...." />}</h3>
            {!isTransactionSuccessful && <div style={{ color: "red" }}>{transactionError}</div>}
            <form onSubmit={onSubmit} className="form">
                <div>
                    <label htmlFor="TokenId" >Enter Token Id</label>
                    <input type="text" value={TokenId} onChange={(e) => setTokenId(e.target.value)} placeholder="Enter Property token Id" />

                </div>
                {
                    isTransactionInProcess ?
                        <div className="btn" style={{ background: "blue", color: "white" }}> Transaction in Process...</div> :
                     <div className="center">   <button className="btn" style={{ background: "blue", color: "white" }}> Enable For Sale</button></div>
                }
            </form>


        </>

    )

}

export default EnablePropertySale;