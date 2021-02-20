import React from "react";
import "./App.css"
import { GlobalProvider } from "../context/GlobalState";

// import { RegisterProperty } from './RegisterProperty'
// import Navbar from './Navbar';
// import EnablePropertySale from "./EnablePropertySale";
// import { EthAccountInfo } from './EthAccountInfo';
// import PropertyList from "./PropertyList";
import Routes from '../Routes/Route'

function App() {

  return (
    <GlobalProvider>
     
      <div>
      <Routes/>  
      </div>

    </GlobalProvider>

  )
}


export default App;