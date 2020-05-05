import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { graphql, compose } from 'react-apollo';
import { getStudentQuery} from '../../queries/queries';
import { updateStudentDetailsMutation } from '../../mutation/mutations';

const initialState={
  detailsSubmitted : false,
  name : null,
  dob : null,
  city : null,
  state : null,
  country : null,
  objective : null,
  contactno : null,
  skills : null,
  email : null
}


class Editdetails extends Component{

  constructor(props){
      super(props);      
      this.state = initialState;
      this.nameChangeHandler = this.nameChangeHandler.bind(this);
      this.dobChangeHandler = this.dobChangeHandler.bind(this);
      this.cityChangeHandler = this.cityChangeHandler.bind(this);
      this.stateChangeHandler = this.stateChangeHandler.bind(this);
      this.countryChangeHandler = this.countryChangeHandler.bind(this);
      this.objectiveChangeHandler = this.objectiveChangeHandler.bind(this);
      this.contactnoChangeHandler = this.contactnoChangeHandler.bind(this);
      this.submitStudentDetails = this.submitStudentDetails.bind(this);
      this.skillsChangeHandler = this.skillsChangeHandler.bind(this);

  }

  nameChangeHandler = (e) => {
    this.setState({name : e.target.value});
  }

  contactnoChangeHandler = (e) => {
    this.setState({contactno: e.target.value});
  }

  dobChangeHandler = (e) => {
    this.setState({dob: e.target.value});
  }

  cityChangeHandler = (e) => {
    this.setState({city: e.target.value});
  }

  stateChangeHandler = (e) => {
    this.setState({state: e.target.value});
  }

  countryChangeHandler = (e) => {
    this.setState({country: e.target.value});
  }

  objectiveChangeHandler = (e) => {
    this.setState({objective: e.target.value});
  }

  skillsChangeHandler = (e) => {
    this.setState({skills: e.target.value});
  }

  emailChangeHandler = (e) => {
    this.setState({email: e.target.value});
  }

  submitStudentDetails = async(e) => {
    e.preventDefault();
    let student;
    if (this.props.data.student) {
        student = this.props.data.student;
    }

    let mutationResponse = await this.props.updateStudentDetailsMutation({
        variables: {
            username : localStorage.getItem('username'),
            email: this.state.email || student.email,
            name: this.state.name || student.basicDetails.name,
            contactno : this.state.contactno || student.basicDetails.contactno,
            dob: this.state.dob || student.basicDetails.dob ,
            city: this.state.city || student.basicDetails.city,
            state: this.state.state || student.basicDetails.state,
            country: this.state.country || student.basicDetails.country,
            objective: this.state.objective || student.basicDetails.objective,
            skills: this.state.skills || student.basicDetails.skills,
        }
    });
    let response = mutationResponse.data.updateStudentDetails;
    if (response) {
        if (response.status === "200") {
            this.setState({
                detailsSubmitted: true
            });
        }
    }
  }

  render() {
    let redirectVar = null;
    if (this.state.detailsSubmitted) {
      redirectVar = <Redirect to={{pathname :"/studentprofilepage", state: {edit: true}}} />
    }
    if (!this.props.data.student) {
      return <div/>;
    }

    const student = this.props.data.student;
    return(
      <div>
      {redirectVar}
        <br />              
        <div className="col-md-offset-0">
           <div className="profile-content">
              <div className="col-md-offset-4">
                <h2>Edit Profile</h2>
                <label>Name</label>
                <input style={{width:"300px"}} onChange = {this.nameChangeHandler}placeholder=
                {student.basicDetails? student.basicDetails.name:null}value={this.state.name}
                type="text" className="form-control" name="name" />
                <br/>
                <label>Date Of Birth</label>
                <input style={{width:"300px"}} onChange = {this.dobChangeHandler}placeholder={student.basicDetails?
                student.basicDetails.dob:null}value={this.state.dob}
                type="date" className="form-control" name="dob" />
                <br/>
                <label>City</label>
                <input style={{width:"300px"}} onChange = {this.cityChangeHandler}placeholder={student.basicDetails?student.basicDetails.city:null}value={this.state.city} 
                type="text" className="form-control" name="city" />
                <br/>
                <label>State</label>
                <input style={{width:"300px"}} onChange = {this.stateChangeHandler}placeholder={student.basicDetails?student.basicDetails.state:null} value={this.state.state}
                type="text" className="form-control" name="state" />
                <br/>
                <label>Country</label>
                <input style={{width:"300px"}} onChange = {this.countryChangeHandler}placeholder={student.basicDetails?student.basicDetails.country:null} value={this.state.country}
                type="text" className="form-control" name="country" />
                <br/>
                <label>Contact No:</label>
                <input style={{width:"300px"}} onChange = {this.contactnoChangeHandler}placeholder={student.basicDetails?student.basicDetails.contactno:null} value={this.state.contactno}
                type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required className="form-control" name="contactno" />
                <br/>
                <label>Email:</label>
                <input style={{width:"300px"}} onChange = {this.emailChangeHandler}placeholder={student.email?student.email:null} value={this.state.email}
                type="email" className="form-control" name="email" multiple />
                <br/>
                <label>Skills</label>
                <input style={{width:"300px"}} onChange = {this.skillsChangeHandler} value={this.state.skills} placeholder={student.basicDetails? student.basicDetails.skills:null}
                type="text" className="form-control" name="skills" />
                <br/>
                <label>Objective</label>
                <input  style={{width:"300px"}} onChange = {this.objectiveChangeHandler}placeholder={student.basicDetails?student.basicDetails.objective:null} value={this.state.objective}
                type="text" className="form-control" name="objective" />
                <br />
              <button type="button" onClick={this.submitStudentDetails} className="btn btn-success">Save</button> 
              {/* <button type="button" onClick={this.cancelStudentDetails} className="btn btn-success">Cancel</button>  */}
            </div>
          </div>
        </div>   
    </div>                
    )    
  }
}


export default compose(graphql(getStudentQuery, {
  options: () => {
    return { variables: { username: localStorage.getItem("username") }};
  }
}),
graphql(updateStudentDetailsMutation, { name: "updateStudentDetailsMutation" }))(Editdetails);