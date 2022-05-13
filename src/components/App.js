import React, { Component } from 'react';
import './App.css';
import Login from "./Login";
import Main from "./Main";
import Signature from "./enterSignature";
import Vote from "./Vote";

class App extends Component {
  render(layout = (                    
    <div>
        <Main/>
    </div>
  ),
) {
    return (
      <div>
        {layout}
      </div>
    )
  }
}

export default App;
