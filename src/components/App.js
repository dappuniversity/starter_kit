import React, { Component } from 'react';
import './App.css';
import Login from "./Login";

class App extends Component {
  render(layout = (                    
    <div>
        <Login/>
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
