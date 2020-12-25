import React from "react";
import "./App.css"
import { GlobalProvider } from "../context/GlobalState";


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