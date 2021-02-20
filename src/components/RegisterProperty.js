import React, { useState } from 'react'
import { useStore } from '../context/GlobalState'
import { registerPropertyAsync } from '../store/asyncActions'
import Loader from '../images/loader.gif'
import {EthAccountInfo} from './EthAccountInfo'
import {EnablePropertySale} from './EnablePropertySale'
// import { PropertyPricing } from '../store/actions'

export const RegisterProperty = () => {
    const [_propertyAddress, setpropertyAddress] = useState("");
    const [_city, setcity] = useState("")
    const [_room, setroom] = useState(0)
    const [_area, setarea] = useState("")
    const [_priceInEther, setpriceInEther] = useState(1000000000000000000)
    const [_propertyType, setproeprtyType] = useState("")
    const [_saleStatus, setsaleStatus] = useState(false)
    const [_tokenUri, settokenUri] = useState("")

    const [{ contract, accounts }, dispatch] = useStore();
    const [isTransactionInProcess, setTransactionInProcess] = useState(false)
    const [isTransactionSuccessful, setTransactionSuccessful] = useState(true)
    const [transactionError, setTransactionError] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault();
        setTransactionSuccessful(true)
        setTransactionError("")
        try {
            setTransactionInProcess(true)
            const newProperty = {
                _propertyAddress,
                _city,
                _room,
                _area,
                _priceInEther,
                _propertyType,
                _saleStatus,
                _tokenUri
            }
            await registerPropertyAsync(contract, accounts, newProperty, dispatch)
            console.log(newProperty)
            setTransactionInProcess(false)
            setTransactionSuccessful(true)
        } catch (error) {
            console.log(error)
            setTransactionInProcess(false);
            setTransactionSuccessful(false)
            setTransactionError(error.message)
        }
    }

    return (
        
        <>
         <EthAccountInfo/>
            <h3>Add new Property{isTransactionInProcess && <img width="40px" src={Loader} alt="Loading...." />}</h3>
            {!isTransactionSuccessful && <div style={{ color: "red" }}>{transactionError}</div>}
            <form onSubmit={onSubmit} className="form">
            
                <div className="form-group ">
                    <label htmlFor="text">Address</label>
                    <input type="text" required value={_propertyAddress} onChange={(e) => setpropertyAddress(e.target.value)} placeholder="Enter Address.." />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City </label>
                    <input type="text" required value={_city} onChange={(e) => setcity(e.target.value)} placeholder="Enter city.." />
                </div>
                <div className="form-group">
                    <label htmlFor="room">Room(s)</label>
                    <input type="text" required value={_room} onChange={(e) => setroom(e.target.value)} placeholder="Enter room.." />
                </div>
                <div className="form-group">
                    <label htmlFor="area">Area</label>
                    <input type="text" required value={_area} onChange={(e) => setarea(e.target.value)} placeholder="Enter area.." />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" required value={_priceInEther} onChange={(e) => setpriceInEther(e.target.value)} placeholder="Enter Price.." />
                </div>
                <div className="form-group">
                    <label htmlFor="propertyType">PropertyType</label>
                    <input type="text" required value={_propertyType} onChange={(e) => setproeprtyType(e.target.value)} placeholder="Enter propertyType.." />
                </div>
                <div className="form-group">
                    <label htmlFor="SaleStatus">SaleStatus</label>
                    <input type="radio" value="true" name="salestatus" onChange={(e) => setsaleStatus(e.target.value)} /> True
                    <input type="radio" value="False" name="salestatus" onChange={(e) => setsaleStatus(e.target.value)} /> False
                </div>

                <div className="form-group">
                    <label htmlFor="TokenUri">TokenUri</label>
                    <input type="text" value={_tokenUri} onChange={(e) => settokenUri(e.target.value)} placeholder="Enter TokenUri.." />
                </div>

                {
                    isTransactionInProcess ?
                        <div className="btn"style={{background:"blue",color:"white"}}> Transaction in Process...</div> :
                       <div className="center"> <button className="btn"style={{background:"blue",color:"white"}}> Register Property</button></div>
                }
            </form>
            <EnablePropertySale/>
      
        </>
    )

}
