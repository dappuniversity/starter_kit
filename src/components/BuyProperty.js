import React, { useState } from 'react'
import { useStore } from '../context/GlobalState';

export const BuyProperty = ({PropertyId_TokenId}) => {

    const [{ contract, accounts }, dispatch] = useStore();
    const [isTransactionInProcess, setTransactionInProcess] = useState(false)
    const [isTransactionSuccessful, setTransactionSuccessful] = useState(true)
    const [transactionError, setTransactionError] = useState("")

    const buy_Property = async () => {
        const Buy = await contract.methods.BuyProperty(PropertyId_TokenId).send({ from: accounts[0] })
        console.log(Buy, "buy_Property Function Run Successfully")
    }

    return (
        <>
            {!isTransactionSuccessful && <div style={{ color: "red" }}>{transactionError}</div>}
            {       isTransactionInProcess ?
                <div className="btn" style={{ background: "blue", color: "white" }}> Transaction in Process...</div> :
                <div className="center"> <button className="btn" onClick={() => buy_Property()} style={{ background: "blue", color: "white" }}> Buy Property</button></div>
            }
        </>
    )
}


// export default Buyproperty;