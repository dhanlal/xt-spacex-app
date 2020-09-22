import React,{Component } from 'react';
import './homepage.css';
import queryString from 'query-string';
// import { withRouter } from 'react-router';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
  } from "react-router-dom";
class Sidebar extends Component{
  constructor(){
      super();
      this.handleFilter = this.handleFilter.bind(this);
      this.state ={
        // items: [],
        launch_success:null,
        land_success:null,
        launch_year: null
      }
  }
  componentDidMount(){
    let params = queryString.parse(this.props.location.search)
       console.log(this.props.history.location.search, new URLSearchParams(this.props.location.search) ,params)
    if(Object.keys(params).length){
        this.setState({
            ...params
        },() => this.props.applyFilter(this.state))

    }


  }
  handleFilter(event){
      const {name, value} =event.target;
      this.setState(
          {
              [name] : value

          },()=> {
            this.props.applyFilter(this.state)
            this.props.history.push({
                pathname: '/',
                search: queryString.stringify(this.state)
            })
          }
      )

  }
  render(){
    let launchYear = [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
    const { items } = this.state;
    return(
        <div className="sidebar-main-1">
            <span> Filter </span>
            <div className="sidebar">
               <span> Lunch Year</span>
                <div className="main-2">
                {
                    launchYear.map(year => (
                        <div className="year-bt" id={year} key={year}>
                            <button  value={year} name="launch_year" onClick = {this.handleFilter}>{year}</button>
                        </div>
                    ))
                }
                {/* </div> */}
                <span className="spacex-launch">Successful Launch</span>
                  <hr />
                {/* <div> */}
                <div className="year-bt">
                    <button name="launch_success" value="true"  onClick = {this.handleFilter}>True</button>
                    <button name="launch_success" value="false"  onClick = {this.handleFilter}>False</button>
                </div>
                {/* </div> */}
                <span>Successful Landing</span>
                {/* <div> */}
                <div className="year-bt">
                    <button name="land_success" value="true"  onClick = {this.handleFilter}>True</button>
                    <button name="land_success" value="false" onClick = {this.handleFilter}>False</button>
                </div>
                </div>
            </div>
        </div>
       );

  }
}

export default withRouter(Sidebar);