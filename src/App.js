import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './homepage/Sidebar';
import Homepage from './homepage/Homepage';
import { findByTestId } from '@testing-library/react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
class App extends Component {

  constructor(){
    super();
    this.state ={
      error: null,
      isLoaded: true,
      items: [],
    }
}
  componentDidMount(){
    this.getSpacexData();
  }
  getSpacexData(filterObject={}){
    this.setState({isLoaded: true})
    let url = "https://api.spaceXdata.com/v3/launches?limit=20";
    Object.keys(filterObject).map(key => {
      const value = filterObject[key]
      if(value){
        url = `${url}&${key}=${value}`
      }
    })
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
         console.log(result, filterObject)
        this.setState({
          isLoaded: false,
          items: result
        });
      },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  }
  applyFilter = (filterObject) =>{
        // console.log(filterObject);
        this.getSpacexData(filterObject)
  }

 render(){
  const { error, isLoaded, items } = this.state;
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>

          <div className="sidebar-main">
            <Sidebar
            applyFilter = {this.applyFilter}
            />

          </div>
          <div className="homepage">
              <Homepage
              error = {error}
              isLoaded = {isLoaded}
              items = {items}
              />
          </div>
          </Route>
        </Switch>
      </Router>


    </div>
  );
 }

}

export default App;
