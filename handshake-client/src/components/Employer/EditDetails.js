import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { graphql, compose } from 'react-apollo';
import { getEmployerQuery} from '../../queries/queries';
import { updateEmployerDetailsMutation } from '../../mutation/mutations';

const initialState={
  detailsSubmitted : false,
  name : null,
  location : null,
  description : null,
  contactno : null,
}

class EditEmployerDetails extends Component{

  constructor(props){
      super(props);      
      this.state = initialState;
      this.nameChangeHandler = this.nameChangeHandler.bind(this);
      this.locationChangeHandler = this.locationChangeHandler.bind(this);
      this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
      this.contactNoChangeHandler = this.contactNoChangeHandler.bind(this);
      this.submitEmployerDetails = this.submitEmployerDetails.bind(this);

  }

  nameChangeHandler = (e) => {
    this.setState({name : e.target.value});
  }

  locationChangeHandler = (e) => {
    this.setState({location : e.target.value});
  }

  descriptionChangeHandler = (e) => {
    this.setState({description : e.target.value});
  }

  contactNoChangeHandler = (e) => {
    this.setState({contactno : e.target.value})
  }

  submitEmployerDetails = async(e) => {
    e.preventDefault();
    let employer;
    if (this.props.data.employer) {
        employer = this.props.data.employer;
    }

    let mutationResponse = await this.props.updateEmployerDetailsMutation({
        variables: {
            username : localStorage.getItem('username'),
            name : this.state.name || employer.name,
            location: this.state.location || employer.location,
            description: this.state.description || employer.description,
            contactno : this.state.contactno || employer.contactno
        }
    });
    let response = mutationResponse.data.updateEmployerDetails;
    if (response) {
        if (response.status === "200") {
            this.setState({
                detailsSubmitted: true
            });
        }
    }
  }



  render() {
    console.log("Here",this.props);
    let redirectVar = null;
    if (this.state.detailsSubmitted) {
      redirectVar = <Redirect to="/employerprofilepage" />
    }
    if (!this.props.data.employer) {
      return <div/>;
    }

    const employerDetails = this.props.data.employer;

    return(
      <div>
      {redirectVar}
        <br />
      <React.Fragment>
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2>Profile Overview</h2>
              </div>
              <div className="form-group">
                <label>Name</label>
                <input onChange = {this.nameChangeHandler} value={this.state.name}
                placeholder={employerDetails?employerDetails.name:null}
                type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input onChange = {this.locationChangeHandler} value={this.state.location} 
                placeholder={employerDetails?employerDetails.location:null}
                type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input onChange = {this.descriptionChangeHandler} value={this.state.description} 
                placeholder={employerDetails?employerDetails.description:null}
                type="text" className="form-control"/>
              </div>
              <div className="form-group">
                <label>Contact No.</label>
                <input onChange = {this.contactNoChangeHandler}value={this.state.contactno} 
                placeholder={employerDetails?employerDetails.contactno:null} 
                type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required className="form-control" />
              </div>
              <button type="button" onClick={this.submitEmployerDetails} className="btn btn-primary">Save</button>    
            </div>
          </div>
        </div>
      </React.Fragment> 
      </div>
    )    
  }
}

export default compose(graphql(getEmployerQuery, {
  options: () => {
    return { variables: { username: localStorage.getItem("username") },
             fetchPolicy: 'no-cache'
            };
  }
}),
graphql(updateEmployerDetailsMutation, { name: "updateEmployerDetailsMutation" }))(EditEmployerDetails);
