import React, { useState } from 'react'
import { useStore } from '../context/GlobalState';
import Web3 from 'web3'

export const BuyProperty = ({PropertyId_TokenId,val,OwnerAddress}) => {

    const [{ contract, accounts }, dispatch] = useStore();
    const [isTransactionInProcess, setTransactionInProcess] = useState(false)
    const [isTransactionSuccessful, setTransactionSuccessful] = useState(true)
    const [transactionError, setTransactionError] = useState("")
    // console.log(val,Web3.utils.toWei(val,'ether'))
    const buy_Property = async () => {
        const Buy = await contract.methods.BuyProperty(PropertyId_TokenId).send({ from: accounts[0], to:OwnerAddress, value:Web3.utils.toWei(val,'ether') })
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