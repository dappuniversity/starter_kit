import React, { useState, useEffect } from 'react'
import { useStore } from '../context/GlobalState'
import { property_Detail } from "../store/asyncActions";
import { useParams } from 'react-router-dom'
function PropertyItem() {

    const { id } = useParams();
    const [{ contract, accounts }, dispatch] = useStore();
    const [events, setEvents] = useState([{}]);

    useEffect(() => {
        async function getData() {
            const response = await property_Detail(contract)
            setEvents(response)
        }
        getData();
    }, [])
    
    let returnValues = []
    const alldata = () => {
        events.map((item, index) => {
            return returnValues[index] = item.returnValues
        })
        return returnValues
    }
    returnValues = alldata()
    const val = id - 1;
    let dataItem = []
    dataItem = returnValues[val]

    const data = () => {

        for (var a in dataItem) {
            // console.log(dataItem[a])
            // return <div>{dataItem}</div>
            try {

                const tokenId = dataItem[0]
                const useraddress = dataItem[1]
                const address = dataItem[2]
               
                console.log(typeof (useraddress), useraddress)

                return <div>
                    <br/>
                    <h3><b>Owner Address:</b> {useraddress}</h3>
                    <br/>
                    <h3>Token Id: {tokenId}</h3>
                    <h3>Property Address: {address}</h3>
                    <h3>City: {dataItem[3] }</h3>
                    <h3>Rooms: {dataItem[4] }</h3>
                    <h3>Area: {dataItem[5] }</h3>
                    <h3>Property Type: {dataItem[6] }</h3>
                    <h3>Price: {dataItem[7] }</h3>

                </div>
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            {data()}
        </>
    )
}

export default PropertyItem;