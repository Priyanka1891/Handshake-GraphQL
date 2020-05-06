import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { graphql } from 'react-apollo';
import { getStudentQuery} from '../../queries/queries';


const initialState={
  editExperienceDetails : false,
  detailsSubmitted : false,
}

class Experience extends Component{
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  editStudentDetails = (e) =>{
    this.setState({
      editExperienceDetails : true
    })
  }


  render(){
      let redirectVar = null;
      const student = this.props.student;
      if (this.state.editExperienceDetails) {
        redirectVar = <Redirect to='/editexperiencedetails'/>
      }

      return(
        <React.Fragment>
        {redirectVar}
        <h2>Experience Overview&nbsp;&nbsp;&nbsp;{this.props.edit?(<button type="button" onClick={this.editStudentDetails} className="btn btn-default btn-sm"><span className="glyphicon glyphicon-pencil"></span>
                  </button>) :null} </h2>
                  <label>Company Name :&nbsp;{student.studentExperience.companyname}</label>
                  <br />
                  <label>Job Title :&nbsp;{student.studentExperience.title}</label>
                  <br />
                  <label>Company Location :&nbsp;{student.studentExperience.companylocation}</label>
                  <br />
                  <label>Start Date :&nbsp;{student.studentExperience.startdate}</label>
                  &nbsp;&nbsp;-&nbsp;&nbsp;
                  <label>End Date :&nbsp;{student.studentExperience.enddate}</label>
                  <br />
                  <label>Job Details :&nbsp;{student.studentExperience.jobdetails}</label>
        </React.Fragment>
        )
    }
}

export default Experience;

// export default graphql(getStudentQuery, {
//   options: () =>{
//       return {variables: { username: localStorage.getItem("username") }}
//   }})(Experience);
