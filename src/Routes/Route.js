import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import  Home from '../components/pages/Home';
import  About  from '../components/pages/About';
import { RegisterProperty } from '../components/RegisterProperty'
import { PropertyList } from '../components/PropertyList'
import PropertyItem from '../components/PropertyItem'
import '../components/App.css'



function RouteConfig() {
    return (
        <div >
          <Router>
            <nav className="navbar bg-dark shadow">
                <a
                    className="navbar-brand col-sm-3 col-md-2 mr-0"
                    href="http://www.google.com.pk"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Smart Estate
                </a>
                <Link to="/"> Home </Link>
                <Link to="/RegisterProperty"> Register Property </Link>
                <Link to="/about"> About </Link>
            </nav>
        
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/About" component={About} />
            <Route exact path="/RegisterProperty" component={RegisterProperty} />
            {/* <Route exact path="/PropertyPricing" component={PropertyPricing} /> */}
            <Route exact path="/property" component={PropertyList} />
            <Route path="/property/:id" component={PropertyItem} />
            <Route path="*" component={()=><h2> 404 Not Found</h2>} />

            </Switch>
        </Router>

        </div>

    )

}
export default RouteConfig;