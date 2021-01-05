import React,{ useEffect, useState } from 'react'
import { useStore } from '../context/GlobalState';
import Loader from '../images/loader.gif'
import OfferAccepting from './OfferActions/OfferAccept';
import OfferRejecting from './OfferActions/OfferReject';

function OfferStatus({ PropertyId_TokenId }) {

    const [{ contract, accounts }, dispatch] = useStore();
    const [Data, setData] = useState([])
    const [isTransactionInProcess, setTransactionInProcess] = useState(false)
    const [isTransactionSuccessful, setTransactionSuccessful] = useState(true)
    const [transactionError, setTransactionError] = useState("")
    useEffect(() => {
        getOffers();
    }, [])

    const getOffers = async () => await contract.methods.OfferStatus(PropertyId_TokenId).call({
        from: accounts[0]
    }).then(function (result, error) {
        if (result) {
            setData({ Data: result })
        } else if (error) {
            console.log(error)
            setTransactionInProcess(false);
            setTransactionSuccessful(false)
            setTransactionError(error.message)
        }
    })

    return (<div>
        <br />
        <h3>Offers{isTransactionInProcess && <img width="40px" src={Loader} alt="Loading...." />}</h3>
        { accounts[0] ? <table className="bids" style={{ width: 100 }} >
            <thead>
                <tr>
                    <th>Buyer Address</th>
                    <th>Bid (Offer in Ethers)</th>
                    <th>Request Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            {Object.values(Data).map((item, index) => {
                return item.map((post, i) => (
                    <>
                        <tbody>
                            <tr key={post[0]} >
                                <td><h4>{post[1]}</h4></td>
                                <td><h4>{post[2]}</h4></td>
                                <td><h4>{post[3]}</h4></td>
                                <td>{<OfferAccepting PropertyId_TokenId={PropertyId_TokenId} BuyerAddress={post[1]} useStore={useStore} />}</td>
                                <td>{<OfferRejecting PropertyId_TokenId={PropertyId_TokenId} BuyerAddress={post[1]} useStore={useStore} />}</td>
                            </tr>
                        </tbody>
                    </>
                ))
            })}
        </table> : <h3 >No Bids Available</h3>}
    </div>)
}

export default OfferStatus;
