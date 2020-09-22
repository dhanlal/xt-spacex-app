import React, {Component} from 'react';
import './homepage.css';

class Homepage extends Component{

    render(){

     const { error, isLoaded, items } = this.props;
      if (error) {

        return <div>Error: {error.message}</div>;
      } else if (isLoaded) {

        return <div>Loading...</div>;
      } else {
        return (
          <div className="main" id="main">
            {/* <div> */}
                 {items.map((item) => (
                    <div className="card" key={item.flight_number}>
                        <div className="space-img"><img src={item.links.mission_patch_small} /></div>
                        <div className="container">
                        <h4 ><b>{item.mission_name} #{item.flight_number}</b></h4>
                        <div className="data"><level className="space-la">Mission Id:</level> <span>{item.mission_id}</span></div>
                        <div className="data"> <level className="space-la">Launch Year:</level> <span>{item.launch_year}</span></div>
                        <div className="data"><level className="space-la"> Successful Launch: </level><span>{"" + item.launch_success}</span></div>
                        <div className="data"> <level className="space-la">Successful Landing:</level> <span>{item.rocket.first_stage.cores[0].land_success === true ? "True" : "False"}</span></div>

                    </div>
                    </div>

                ))}
          </div>
        );
      }
    }
}

export default Homepage;