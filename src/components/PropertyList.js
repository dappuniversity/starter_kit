import React, { useState, useEffect } from 'react'
import { useStore } from '../context/GlobalState'
import { property_Detail } from "../store/asyncActions";

import Loader from '../images/loader.gif'
import { property_detail } from "../store/actions";

export const PropertyList = () => {
    const [events, setEvents] = useState([{}]);
    // const [data, setData] = useState([{}])
    const [{ contract, accounts }, dispatch] = useStore();


    useEffect(() => {
        async function getData() {
            const response = await property_Detail(contract)
            setEvents(response)
            // setData(returnValues)
        }
        getData();
    }, [])
    let returnValues = [] //or it may be object
    const alldata = () => {
        events.map((item, index) => {
            return returnValues[index] = item.returnValues

        })
     
        return returnValues
    }
    returnValues = alldata()

    return (

        <div>
            {/* {console.log(returnValues)} */}

            {/* {data()} */}

            {returnValues.map(item => {
                for (var a in item){
                  return  <div keys={item[0]}> 
                  <h3>{item[0]}</h3>
                  <h3>{item[1]}</h3>
                  <h3>{item[2]}</h3>
                  <h3>{item[3]}</h3>
                  <h3>{item[4]}</h3>
                  <h3>{item[5]}</h3>
                  <h3>{item[6]}</h3>
                  <h3>{item[7]}</h3>
                  <h3>{item[8]}</h3>
                  <br/>
                  </div>
                } })
            }
            
                {/* // console.log(item[0].useraddress)
                // return Object.keys(item).map((val, index) => {
                //     console.log(index)
                    // return Object.keys(returnValues[val]).map( data=>{

                    //     return data.area
                    // })

                // })
         //   })
           // } */}

            {/* {returnValues.map((index) => {
                return Object.values(index).map((item, i) => {
                    console.log(index["2"])
                    return <li key={i}> {item}</li>
                })
            })} */}
            {alldata}
        </div>

    )
}
