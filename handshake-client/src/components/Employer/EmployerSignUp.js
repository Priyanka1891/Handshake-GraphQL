import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { graphql } from 'react-apollo';
import { employerSignupMutation } from '../../mutation/mutations';

const initialState={
  username : "",
  password : "",
  email : "",
  location : "",
  signUpDone : false
}

class EmployerSignUp extends Component{

  constructor(props){
    super(props);
    this.state=initialState;
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
  }

  usernameChangeHandler = (e) => {
    this.setState({
      username : e.target.value,
    })
  }
  
  passwordChangeHandler = (e) => {
    this.setState({
      password : e.target.value,
    })
  }
  
  emailChangeHandler = (e) => {
    this.setState({
      email : e.target.value,
    })
  }
  
  locationChangeHandler = (e) => {
    this.setState({
      location : e.target.value,
    })
  }
  
  submitDetails = async(e) => {
    e.preventDefault();
    let mutationResponse = await this.props.employerSignupMutation({
      variables: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          location : this.state.location
      }
    });
    let response = mutationResponse.data.employersignup;
    if (response) {
        if (response.status === "200") {
          this.setState({
            signUpDone: true
          });
          window.alert(response.message);
        } 
    }
  }
  render(){
    let redirectVar = null;
    if (this.state.signUpDone) {
      redirectVar = <Redirect to="/employer" />
    }
    return(
      <div>
        {redirectVar}
        <br />
          <div className="container">
            <div className="login-form">
              <div className="main-div">
                <div className="panel">
                  <h2>Company Details</h2>
                  <span>Please enter your details</span>
                </div>
                <div className="form-group">
                  <label>Company Name</label>
                  <input onChange = {this.usernameChangeHandler}value={this.state.username} 
                  type="text" className="form-control" name="username" placeholder="Userame" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input onChange = {this.passwordChangeHandler}value={this.state.password} 
                  type="password" className="form-control" name="password" placeholder="Password" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input onChange = {this.emailChangeHandler}value={this.state.email}  
                  type="email" className="form-control" name="email" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input onChange = {this.locationChangeHandler}value={this.state.location} 
                  type="text" className="form-control" name="location" placeholder="Location" />
                </div>
                <button type="button" className="btn btn-primary"onClick = {this.submitDetails}>Submit Details</button>    
                <br />
                <br />
                <form action="http://localhost:3000/student">
                  <input type="submit" className="btn btn-secondary" value="Switch to Student" />
                </form>
                {/* <button type="button" className="btn btn-secondary"onclick="location.href='http://localhost:3000/student';">Switch to Student</button>         */}
              </div>
            </div>
          </div>
        </div>
        )
    }


}
  // export Employer Sign Up Component
  export default graphql(employerSignupMutation, { name: "employerSignupMutation" })(EmployerSignUp);
