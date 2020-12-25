import React, { useState } from 'react'
import Web3 from 'web3'
import { useStore } from '../context/GlobalState'
import { registerPropertyAsync } from '../store/asyncActions'
import Loader from '../images/loader.gif'
import { EthAccountInfo } from './EthAccountInfo'
import { EnablePropertySale } from './EnablePropertySale'

export const RegisterProperty = () => {

    const ipfsClient = require('ipfs-http-client')
    const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })


    const [_propertyAddress, setpropertyAddress] = useState("");
    const [_city, setcity] = useState("")
    const [_room, setroom] = useState(0)
    const [_area, setarea] = useState("")
    const [_priceInEther, setpriceInEther] = useState(0)
    const [_propertyType, setpropertyType] = useState("")
    const [_saleStatus, setsaleStatus] = useState(false)
    const [_tokenUri, settokenUri] = useState("")
    const [_buffer, _setbuffer] = useState()

    const [{ contract, accounts }, dispatch] = useStore();
    const [isTransactionInProcess, setTransactionInProcess] = useState(false)
    const [isTransactionSuccessful, setTransactionSuccessful] = useState(true)
    const [transactionError, setTransactionError] = useState("")
    let _image;
    const onSubmit = async (e) => {

        e.preventDefault();
        ipfs.add(_buffer, async (error, result) => {
            if (error) {
                console.error(error)
                return
            }
            setTransactionSuccessful(true)
            setTransactionError("")

            try {

                setTransactionInProcess(true)
                const newProperty = {
                    _propertyAddress,
                    _city,
                    _room,
                    _area,
                    _priceInEther: Web3.utils.toWei(_priceInEther.toString(), 'Ether'),
                    _propertyType,
                    _saleStatus,
                    _image: result[0].hash,
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
        })


    }

    return (

        <>
            <EthAccountInfo />
            <h3>Add new Property{isTransactionInProcess && <img width="40px" src={Loader} alt="Loading...." />}</h3>
            {!isTransactionSuccessful && <div style={{ color: "red" }}>{transactionError}</div>}
            <form onSubmit={onSubmit} className="form">
                <table >
                    
                        <tr>
                            <td><label htmlFor="text">Address</label></td>
                            <td><input type="text" required value={_propertyAddress} onChange={(e) => setpropertyAddress(e.target.value)} placeholder="Enter Address.." /></td>
                        </tr>

                        <tr>
                            <td>  <label htmlFor="city">City </label></td>
                            <td><input type="text" required value={_city} onChange={(e) => setcity(e.target.value)} placeholder="Enter city.." /></td>
                        </tr>
                        <tr>
                            <td>  <label htmlFor="room">Room(s)</label></td>
                            <td> <select
                                value={_room}
                                onChange={(e) => setroom(e.target.value)}>
                                <option disabled="disabled"></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select></td>
                        </tr>
                        <tr>
                            <td>   <label htmlFor="area">Area</label></td>
                            <td> <input type="text" required value={_area} onChange={(e) => setarea(e.target.value)} placeholder="Enter area.." /></td>
                        </tr>
                        <tr>
                            <td>  <label htmlFor="amount">Amount</label></td>
                            <td> <input type="number" required value={_priceInEther} onChange={(e) => setpriceInEther(e.target.value)} placeholder="Enter Price.." /></td>
                        </tr>
                        <tr>
                            <td>  <label htmlFor="propertyType">PropertyType</label></td>
                            <td>  <select
                                value={_propertyType}
                                onChange={(e) => setpropertyType(e.target.value)} >
                                <option disabled="disabled"></option>
                                <option value="Commercial">Commercial</option>
                                <option value="non-Commercial">Non-Commercial (House,Flats Etc..)</option>s
                    </select></td>
                        </tr>
                        <tr>
                            <td> <label htmlFor="SaleStatus">SaleStatus</label></td>
                            <td> <input type="radio" value="true" name="salestatus" onChange={(e) => setsaleStatus(e.target.value)} /> True
                    <input type="radio" value="False" name="salestatus" onChange={(e) => setsaleStatus(e.target.value)} /> False</td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>  <input type="file" name="_image" onChange={(e) => {
                                e.preventDefault()
                                const file = e.target.files[0]
                                const reader = new window.FileReader()
                                reader.readAsArrayBuffer(file)
                                reader.onloadend = () => {
                                    _setbuffer(Buffer(reader.result))
                                }
                            }
                            } />
                            </td>
                        </tr>

                        <tr>
                            <td> <label htmlFor="TokenUri">TokenUri</label></td>
                            <td><input type="text" value={_tokenUri} onChange={(e) => settokenUri(e.target.value)} placeholder="Enter TokenUri.." /></td>
                        </tr>

                        {
                            isTransactionInProcess ?
                                <div className="btn" style={{ background: "blue", color: "white" }}> Transaction in Process...</div> :
                                <div className="center"> <button className="btn" style={{ background: "blue", color: "white" }}> Register Property</button></div>
                        }
                    
                </table>
            </form>
            <EnablePropertySale />

        </>
    )

}
