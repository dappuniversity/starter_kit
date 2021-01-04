import React, { useEffect, useState } from 'react'

function OfferRejecting({PropertyId_TokenId,BuyerAddress,useStore}){
    const [{ contract, accounts }, dispatch] = useStore();
    const [isTransactionInProcess, setTransactionInProcess] = useState(false)
    const [isTransactionSuccessful, setTransactionSuccessful] = useState(true)
    const [transactionError, setTransactionError] = useState("")

// useEffect(() => {
//   offerRejected();
// }, [])

    const offerRejected =async()=>{
        const desision = await contract.methods.OfferReject(PropertyId_TokenId,BuyerAddress).send({from:accounts[0]})
        console.log(desision,"Offer Rejected Successfully")
    }
    return <>
     {
                            isTransactionInProcess ?
                                <div className="btn" style={{ background: "blue", color: "white" }}> Transaction in Process...</div> :
                                <div className="center"> <button className="btn" onClick={()=>offerRejected()} style={{ background: "blue", color: "white" }}> Reject Offer</button></div>
                        }
    </>
}

export default OfferRejecting