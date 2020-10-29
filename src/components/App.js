import React from "react";
import "./App.css"
import {GlobalProvider,GlobalContext} from "../context/GlobalState";

import {RegisterProperty} from './RegisterProperty'
 import Navbar from './Navbar';
function App(){

  return (
<GlobalProvider>
  <Navbar />
<RegisterProperty/>  
</GlobalProvider>

    )
}


export default App;