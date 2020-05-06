import React, {Component} from 'react';
import {Redirect} from 'react-router';


const initialState={
  editDetails : false,
}

class Details extends Component{

  constructor(props) {
    super(props);
    this.state = initialState;
  }


  editEmployerDetails = (e) =>{
    this.setState({
      editDetails : true
    })
  }

  render(){
      let redirectVar = null;
      const employer = this.props.employer;
      if (this.state.editDetails) {
        redirectVar = <Redirect to="/editemployerdetails" />
      }

      return(
        <React.Fragment>
        <div>
        {redirectVar}
          <br />
                <h2>Profile Overview</h2>
                {this.props.edit ?
                  (<button onClick={this.editEmployerDetails} type="button" className="btn btn-default btn-sm">
                  <span className="glyphicon glyphicon-pencil"></span>
                  </button>) : <div/>}
              <br />
              <br />
              <div className="form-group">
                <label>Name :&nbsp;
                {employer.name}</label>
              </div>
              <div className="form-group">
                <label>Location :&nbsp;
                {employer.location}</label>
              </div>
              <div className="form-group">
                <label>Description :&nbsp;
                  {employer.description}</label>
              </div>
              <div className="form-group">
                <label>Contact Information :&nbsp;
                {employer.contactno}</label>
              </div>
          </div>
        </React.Fragment>
        )
    }
}

export default Details;

