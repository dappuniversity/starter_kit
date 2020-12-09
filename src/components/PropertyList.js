import React, { useState, useEffect } from 'react'
import { useStore } from '../context/GlobalState'
import { property_Detail } from "../store/asyncActions";

import Loader from '../images/loader.gif'
import { property_detail } from "../store/actions";

export const PropertyList = () => {

    const [events, setEvents] = useState([{}]);
    const [{ contract, accounts }, dispatch] = useStore();

    useEffect(() => {
        async function getData() {

            const response = await property_Detail(contract)
            //  console.log(JSON.stringify(response));

             const data = response[0];
          //  const data = JSON.stringify(response);
            // console.log(data)
            // setEvents(data["returnValues"])
            setEvents(data)
            //   console.log(data)
            //    console.log(events)
        }
        getData();
    }, [])

    return (

        <div>

            {console.log(events)}
            {/* {
                Object.keys(events).map((values, index) => {
                    return (
                        values
                    )
                })
            } */}


            {/* {Object.keys(events).map((key,index)=>{

                return (
                   <ol key ={index}>
                       <li>{events}</li>
                   </ol>
                )
            })} */}

        </div>
    )
}
