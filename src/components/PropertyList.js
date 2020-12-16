import React, { useState, useEffect } from 'react'
import { useStore } from '../context/GlobalState'
import { property_Detail } from "../store/asyncActions";
import { Link } from 'react-router-dom'

export const PropertyList = () => {
    const [events, setEvents] = useState([{}]);
    const [{ contract, accounts }, dispatch] = useStore();

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

    return (

        <>

            <div className="Products">
                {returnValues.map(item => {
                    for (var a in item) {
                        return <Link keys={item[0]} to={`\product\${item[1]}`} className="eachItem" >
                            <h5 className="align"><b>Seller Address: </b>{item[0]}</h5>
                            <h5 className="align">Property ID: {item[1]}</h5>
                            <h5 className="align">Property Address: {item[2]}</h5>
                            <h5 className="align">City: {item[3]}</h5>
                            <h5 className="align">Room: {item[4]}</h5>
                            <h5 className="align">Area: {item[5]}</h5>
                            <h5 className="align">Property Type: {item[6]}</h5>
                            <h5 className="align">Price: {item[7]}</h5>
                            <h5 className="align">{item[8]}</h5>
                        </Link>
                    }
                })
                }
            </div>

            {alldata}
        </>

    )
}
