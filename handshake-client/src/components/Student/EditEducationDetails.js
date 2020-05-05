import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import { backendURL } from   "../../config";
import StudentNavbar from './StudentNavbar';
import { graphql, compose } from 'react-apollo';
import { getStudentQuery} from '../../queries/queries';
import { updateStudentEducationDetailsMutation } from '../../mutation/mutations';


const initialState={
  detailsSubmitted : false,
  colgname : null,
  location : null,
  degree : null,
  major : null,
  yearofpassing : null,
  cgpa : null
}

class EditEducationDetails extends Component{

  constructor(props){
      super(props);
      this.state= initialState;
      this.state.studentDetails = this.props.studentDetails;
      this.colgnameChangeHandler = this.colgnameChangeHandler.bind(this);
      this.locationChangeHandler = this.locationChangeHandler.bind(this);
      this.degreeChangeHandler = this.degreeChangeHandler.bind(this);
      this.majorChangeHandler = this.majorChangeHandler.bind(this);
      this.yearofpassingChangeHandler = this.yearofpassingChangeHandler.bind(this);
      this.cgpaChangeHandler = this.cgpaChangeHandler.bind(this);
      this.submitStudentDetails = this.submitStudentDetails.bind(this);
  }

  colgnameChangeHandler = (e) => {
    this.setState({colgname : e.target.value});
  }

  locationChangeHandler = (e) => {
    this.setState({location : e.target.value});
  }

  degreeChangeHandler = (e) => {
    this.setState({degree : e.target.value});
  }

  majorChangeHandler = (e) => {
    this.setState({major : e.target.value});
  }

  yearofpassingChangeHandler = (e) => {
    this.setState({yearofpassing : e.target.value});
  }

  cgpaChangeHandler = (e) => {
    this.setState({cgpa : e.target.value});
  }

  submitStudentDetails = async(e) => {
    e.preventDefault();
    let student;
    if (this.props.data.student) {
        student = this.props.data.student;
    }
   
    let mutationResponse = await this.props.updateStudentEducationDetailsMutation({
        variables: {
            username : localStorage.getItem('username'),
            colgname : this.state.colgname || student.studentEducation.colgname,
            location : this.state.location || student.studentEducation.location,
            degree : this.state.degree || student.studentEducation.degree,
            major : this.state.major || student.studentEducation.major ,
            yearofpassing : this.state.yearofpassing|| student.studentEducation.yearofpassing,
            cgpa : this.state.cgpa || student.studentEducation.cgpa,
        }
    });
    let response = mutationResponse.data.updateStudentEducationDetails;
    console.log("Edit education mutation ", response);
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
      redirectVar = <Redirect to="/studentprofilepage" />
    }

    if (!this.props.data.student) {
      return <div/>;
    }

    const student = this.props.data.student;
    return(
      <div>
      {redirectVar}
      <React.Fragment>
        <StudentNavbar/>
      <div className="col-md-offset-0">
           <div className="profile-content">
              <div className="col-md-offset-4">
                <br/>
                <h2>Edit Education</h2>
                {/* <label>College Name</label>
                <input style={{width:"300px"}} onChange = {this.colgnameChangeHandler}value={this.state.colgname} placeholder={this.props.studentDetails.studentEducation[this.props.location.state].colgname}
                type="text" className="form-control" name="colgname" /> */}
                <br/>
                <select style={{width:"300px"}}  className="form-control"
                  onChangeCapture = {this.colgnameChangeHandler} value={this.state.colgname} placeholder = {student.studentEducation.colgname}>
                    <option>-----Choose your University-----</option>
                    <option>UCLA</option>
                    <option>Columbia University</option>
                    <option>Lincoln School</option>
                    <option>UC Berkley</option>
                    <option>Stanford University</option>
                </select>
                <br />
                <label>Location</label>
                <input style={{width:"300px"}} onChange = {this.locationChangeHandler}value={this.state.location} placeholder={student.studentEducation.location}
                type="text" className="form-control" />
                <br />
                <label>Degree</label>
                <input style={{width:"300px"}} onChange = {this.degreeChangeHandler} value={this.state.degree} placeholder={student.studentEducation.degree}
                type="text" className="form-control" />
                <br />
                <div className="form-group">
                  <label>Major*</label>
                  <select className="form-control" style={{width:"300px"}} id="types" onChange = {this.majorChangeHandler} value={this.state.major} placeholder = {student.studentEducation.major}>
                    <option>--Select Major--</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Commerce">Commerce</option>
                  </select>
                </div>

                <br />
                <label>Year of Passing</label>
                <input style={{width:"300px"}} onChange = {this.yearofpassingChangeHandler}value={this.state.yearofpassing} placeholder={student.studentEducation.yearofpassing}
                type="date" className="form-control" />
                <br />
                <label>CGPA</label>
                <input style={{width:"300px"}} onChange = {this.cgpaChangeHandler}value={this.state.cgpa} placeholder={student.studentEducation.cgpa}
                type="text" className="form-control" />
                <br />
              <button type="button" onClick={this.submitStudentDetails} className="btn btn-success">Save</button>    
            </div>
          </div>
        </div>
      </React.Fragment> 
      </div>
    )   
  }
}

export default compose(graphql(getStudentQuery, {
  options: () => {
    return { variables: { username: localStorage.getItem("username") }};
  }
}),
graphql(updateStudentEducationDetailsMutation, { name: "updateStudentEducationDetailsMutation" }))(EditEducationDetails);
