import React, { useState } from 'react'

import { PropertyList } from '../PropertyList'


function Home() {
 // const [{ contract, accounts }, dispatch] = useStore();
  // const [isTransactionInProcess, setTransactionInProcess] = useState(false)
  // const [isTransactionSuccessful, setTransactionSuccessful] = useState(true)
  // const [transactionError, setTransactionError] = useState("")




  return (
    <div >
      <h1>Welcome to Home page</h1>
    
<PropertyList />
    </div>
  );
}

export default Home;