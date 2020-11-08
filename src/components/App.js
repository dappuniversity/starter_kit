import React from "react";
import "./App.css"
import { GlobalProvider } from "../context/GlobalState";

import { RegisterProperty } from './RegisterProperty'
import Navbar from './Navbar';
import EnablePropertySale from "./EnablePropertySale";
import { EthAccountInfo } from './EthAccountInfo';

function App() {

  return (
    <GlobalProvider>
      <Navbar />
      <div>
        <EthAccountInfo />
        <RegisterProperty />
        <EnablePropertySale />
        
      </div>

    </GlobalProvider>

  )
}


export default App;