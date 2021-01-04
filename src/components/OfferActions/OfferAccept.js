import React, { useEffect, useState } from 'react'

function OfferAccepting({ PropertyId_TokenId, BuyerAddress, useStore }) {

    const [{ contract, accounts }, dispatch] = useStore();
    const [isTransactionInProcess, setTransactionInProcess] = useState(false)
    const [isTransactionSuccessful, setTransactionSuccessful] = useState(true)
    const [transactionError, setTransactionError] = useState("")

    // useEffect(() => {
    //     offerAccepted();
    // }, [])

    const offerAccepted = async () => {
        const desision = await contract.methods.OfferAccept(PropertyId_TokenId, BuyerAddress).send({ from: accounts[0] })
        console.log(desision, "Offer Accepted Successfully")
    }

    return <>
        {/* <h3>{isTransactionInProcess }</h3> */}
        {!isTransactionSuccessful && <div style={{ color: "red" }}>{transactionError}</div>}

        {       isTransactionInProcess ?
                                <div className="btn" style={{ background: "blue", color: "white" }}> Transaction in Process...</div> :
                                <div className="center"> <button className="btn" onClick={() => offerAccepted()} style={{ background: "blue", color: "white" }}> Accept Offer</button></div>
                        }
     
    </>
}

export default OfferAccepting