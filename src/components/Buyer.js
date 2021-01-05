import React, { useEffect, useState } from 'react'
import { useStore } from '../context/GlobalState';
import BuyerRequest from './BuyerRequest';
import { BuyProperty } from './BuyProperty';
// import Buyproperty from './BuyProperty';
// import BuyerRequest from './BuyerRequest'


export const Buyer = ({ PropertyId_TokenId, BuyerAddress }) => {

    const [{ contract, accounts }, dispatch] = useStore();
    const [isTransactionInProcess, setTransactionInProcess] = useState(false)
    const [isTransactionSuccessful, setTransactionSuccessful] = useState(true)
    const [transactionError, setTransactionError] = useState("")

    // const [response, setResponse] = useState([])
    const [Data, setData] = useState([])

    const getOffers = async () => await contract.methods.BuyerList(BuyerAddress).call().then(function (result, error) {
        if (result) {
            setData({ Data: result })
        } else if (error) {
            console.log(error)
            setTransactionInProcess(false);
            setTransactionSuccessful(false)
            setTransactionError(error.message)
        }
    })

    useEffect(() => {
        getOffers();
    }, [])

    let states = []
    const getResponse = () => {
        Object.values(Data).map((item, index) => {

            // console.log(typeof (item), item)
            for (var a in item) {
                states = item
                return item[a]
            }
        })
    }

    const r = getResponse()
    const response = states[3]
    // console.log(response)

    return (
        <>
            {
                response == "1" ? <BuyProperty PropertyId_TokenId={PropertyId_TokenId} /> : <BuyerRequest PropertyId_TokenId={PropertyId_TokenId} />
            }
            
        </>
    )
}
