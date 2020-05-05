import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { graphql, compose } from 'react-apollo';
import { getStudentQuery} from '../../queries/queries';
import { updateStudentExperienceDetailsMutation } from '../../mutation/mutations';


const initialState={
  detailsSubmitted : false,
  companyname : null,
  companylocation : null,
  title : null,
  startdate : null,
  enddate : null,
  jobdetails : null,
}

class EditExperiencedetails extends Component{

  constructor(props){
      super(props);
      this.state= initialState;
      this.state.studentDetails = this.props.studentDetails;
      this.companynameChangeHandler = this.companynameChangeHandler.bind(this);
      this.companylocationChangeHandler = this.companylocationChangeHandler.bind(this);
      this.titleChangeHandler = this.titleChangeHandler.bind(this);
      this.startdateChangeHandler = this.startdateChangeHandler.bind(this);
      this.enddateChangeHandler = this.enddateChangeHandler.bind(this);
      this.jobdetailsChangeHandler = this.jobdetailsChangeHandler.bind(this);
      this.submitStudentDetails = this.submitStudentDetails.bind(this);
  }

  companynameChangeHandler = (e) => {
    this.setState({companyname:e.target.value});
  }

  companylocationChangeHandler = (e) => {
    this.setState({companylocation:e.target.value});
  }

  titleChangeHandler = (e) => {
    this.setState({title:e.target.value});
  }

  startdateChangeHandler = (e) => {
    this.setState({startdate:e.target.value});
  }

  enddateChangeHandler = (e) => {
    this.setState({enddate:e.target.value});
  }

  jobdetailsChangeHandler = (e) => {
    this.setState({jobdetails:e.target.value});
  }

  submitStudentDetails = async(e) => {
    e.preventDefault();
    let student;
    if (this.props.data.student) {
        student = this.props.data.student;
    }
   
    let mutationResponse = await this.props.updateStudentExperienceDetailsMutation({
        variables: {
            username : localStorage.getItem('username'),
            companyname : this.state.companyname || student.studentExperience.companyname,
            companylocation : this.state.companylocation || student.studentExperience.companylocation,
            title : this.state.title || student.studentExperience.title,
            startdate : this.state.startdate || student.studentExperience.startdate ,
            enddate : this.state.enddate || student.studentExperience.enddate,
            jobdetails : this.state.jobdetails || student.studentExperience.jobdetails,
        }
    });

    let response = mutationResponse.data.updateStudentExperienceDetails;
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
      <br />
      <React.Fragment>
      <div className="col-md-offset-0">
           <div className="profile-content">
              <div className="col-md-offset-4">
                <h2>Edit Experience</h2>
                <label>Company Name</label>
                <input style={{width:"300px"}} onChange = {this.companynameChangeHandler}value={this.state.companyname} placeholder={student.studentExperience.companyname}
                type="text" className="form-control" name="companyname" />
                <br />
                <label>Title</label>
                <input style={{width:"300px"}} onChange = {this.titleChangeHandler}value={this.state.title} placeholder={student.studentExperience.title}
                type="text" className="form-control" name="dob" />
                <br />
                <label>Company Location</label>
                <input style={{width:"300px"}} onChange = {this.companylocationChangeHandler}value={this.state.companylocationn} placeholder={student.studentExperience.companylocation}
                type="text" className="form-control" name="city" />
                <br />
                <label>Start Date</label>
                <input style={{width:"300px"}} onChange = {this.startdateChangeHandler}value={this.state.startdate} placeholder={student.studentExperience.startdate}
                type="date" className="form-control" name="state" />
                <br/>
                <label>End Date</label>
                <input style={{width:"300px"}} onChange = {this.enddateChangeHandler}value={this.state.enddate} placeholder={student.studentExperience.enddate}
                type="date" className="form-control" name="country" />
                <br/>
                <label>Job Details</label>
                <input style={{width:"300px"}} onChange = {this.jobdetailsChangeHandler}value={this.state.jobdetails} placeholder={student.studentExperience.jobdetails}
                type="text" className="form-control" name="objective" />
                <br/>
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
    return {variables: { username: localStorage.getItem("username")}};
  }
}),
graphql(updateStudentExperienceDetailsMutation, { name: "updateStudentExperienceDetailsMutation" }))(EditExperiencedetails);
