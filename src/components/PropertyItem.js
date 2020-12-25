import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useStore } from '../context/GlobalState'
import { property_Detail } from "../store/asyncActions";
import { useParams } from 'react-router-dom'
import Web3 from 'web3'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));
  



function PropertyItem() {
    const classes = useStyles();

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

        if (dataItem) {
            for (var a in dataItem) {
                try {

                    const useraddress = dataItem[0]
                    const tokenId = dataItem[1]
                    const address = dataItem[2]

                    return <div className={classes.root}>
                        <Paper className={classes.paper}>
                        <Grid container spacing={2}>    
                        <div keys={id}>
                        <img src={`https://ipfs.infura.io/ipfs/${dataItem[8]}`} width="680px" />
                        <br />
                        <h3><b>Owner Address:</b> {useraddress}</h3>
                        <br />
                        <h3>Token Id: {tokenId}</h3>
                        <h3>Property Address: {address}</h3>
                        <h3>City: {dataItem[3]}</h3>
                        <h3>Rooms: {dataItem[4]}</h3>
                        <h3>Area: {dataItem[5]}</h3>
                        <h3>Property Type: {dataItem[6]}</h3>
                        <p>Price: {Web3.utils.fromWei(dataItem[7].toString(), 'Ether')} Eth</p>
                    </div>
                    </Grid>
                    </Paper>
                    
                    </div>
                    
                } catch (error) {
                    console.log(error);
                }
            }
        }
        else {
           return <div>You are trying to direct access to properties or Refreshing the page is not allowed</div>
        }
    }


    return (
        <>
            {data()}
        </>
    )
}

export default PropertyItem;