import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { graphql } from 'react-apollo';
import {loginMutation} from '../../mutation/mutations';

const initialState={
  username : "",
  password : "",
  loginFlag : false
}

class StudentSignIn extends Component{

  constructor(props){
    super(props);
    this.state=initialState;
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.login = this.login.bind(this);
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

login = async (e) => {
  e.preventDefault();
  let mutationResponse = await this.props.loginMutation({
      variables: {
          username: this.state.username,
          password: this.state.password,
      }
  });
  let response = mutationResponse.data.login;
  if (response) {
      if (response.status === "200") {
        this.setState({
          loginFlag: true
        });
      } else {
        this.setState({
          loginFlag: false
        });
      }
  }
}

render() {     
  let redirectVar = null;
  if (this.state.loginFlag) {
    localStorage.setItem("username", this.state.username);
    redirectVar = <Redirect to={{pathname :"/studentprofilepage", state: {edit: true}}} />
  }
  else{
    redirectVar = <Redirect to="/student" />
  }
  return(
    <div>
      {redirectVar}
        <br />
          <div className="container">
            <div className="login-form">
              <div className="main-div">
                <div className="panel">
                  <h2>Student Sign In</h2>
                  <span>Please enter your username and password</span>
                </div>
                <div className="form-group">
                  <label>
                    Username
                  </label>
                  <input onChange = {this.usernameChangeHandler}value={this.state.username}
                  type="text" className="form-control" name="username" placeholder="Username" />
                </div>
                <div className="form-group">
                  <label>
                    Password
                  </label>
                  <input onChange = {this.passwordChangeHandler}value={this.state.password} 
                  type="password" className="form-control" name="password" placeholder="Password" />
                </div>
                <button type="button" className="btn btn-primary" onClick={this.login}>Login</button>    
                <br />
                <br />
                <div>
                  <span>
                    First Time User?&nbsp;
                    <a href="http://localhost:3000/studentsignup">Sign Up Here.</a>
                  </span>
                </div>  
                <br />
                <form action="http://localhost:3000/employer">
                  <input type="submit" className="btn btn-secondary" value="Switch to Employer" />
                </form>
                {/* <button type="button" className="btn btn-secondary">Switch to Employer</button>         */}
              </div>
            </div>
          </div>
     </div>
        )
    }
}

export default graphql(loginMutation, { name: "loginMutation" })(StudentSignIn);
