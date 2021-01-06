import React, { useEffect, useState } from 'react'
import { useStore } from '../context/GlobalState';
import BuyerRequest from './BuyerRequest';
import { BuyProperty } from './BuyProperty';
// import Buyproperty from './BuyProperty';
// import BuyerRequest from './BuyerRequest'


export const Buyer = ({ PropertyId_TokenId,OwnerAddress }) => {

    const [{ contract, accounts }, dispatch] = useStore();
    const [isTransactionInProcess, setTransactionInProcess] = useState(false)
    const [isTransactionSuccessful, setTransactionSuccessful] = useState(true)
    const [transactionError, setTransactionError] = useState("")

    // const [response, setResponse] = useState([])
    const [Data, setData] = useState([])
    // console.log(typeof(BuyerAddress), PropertyId_TokenId)
    // const BuyerAddress = accounts[0]
    const getOffers = async () => await contract.methods.BuyerList(accounts[0]).call().then(function (result, error) {
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

            console.log(typeof (item), item)
            for (var a in item) {
                states = item
                return item[a]
            }
        })
    }

    const r = getResponse()
    const response = states[3]
    const val = states[2]
    const BuyerAddress =states[1]
    console.log(response,val)

    return (
        <>
            {
                response == "1" ? <BuyProperty PropertyId_TokenId={PropertyId_TokenId} val={val} OwnerAddress={OwnerAddress} /> : <BuyerRequest PropertyId_TokenId={PropertyId_TokenId} />
            }
        </>
    )
}
