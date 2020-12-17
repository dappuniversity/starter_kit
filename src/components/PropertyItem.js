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
    const data = returnValues[id]
    const val = id-1;

    returnValues = alldata()
    return (
        <div>
            {
           console.log(typeof(returnValues[val]))
           // Object.keys(returnValues[val]).map((item,index) => {return <div>{item[index]}</div> })
            }

            {alldata()}
        </div>
    )
}

export default PropertyItem;