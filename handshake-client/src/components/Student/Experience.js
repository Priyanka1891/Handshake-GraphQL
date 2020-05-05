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
      if (!this.props.data.student.studentExperience) {
        return <div/>;
      }
      if (this.state.editExperienceDetails) {
        redirectVar = <Redirect to='/editexperiencedetails'/>
      }
      var studentExperience = null;
      studentExperience= this.props.data.student.studentExperience;

      return(
        <React.Fragment>
        {redirectVar}
        <h2>Experience Overview&nbsp;&nbsp;&nbsp;{this.props.edit?(<button type="button" onClick={this.editStudentDetails} className="btn btn-default btn-sm"><span className="glyphicon glyphicon-pencil"></span>
                  </button>) :null} </h2>
                  <label>Company Name :&nbsp;{studentExperience.companyname}</label>
                  <br />
                  <label>Job Title :&nbsp;{studentExperience.title}</label>
                  <br />
                  <label>Company Location :&nbsp;{studentExperience.companylocation}</label>
                  <br />
                  <label>Start Date :&nbsp;{studentExperience.startdate}</label>
                  -&nbsp;&nbsp;
                  <label>End Date :&nbsp;{studentExperience.enddate}</label>
                  <br />
                  <label>Job Details :&nbsp;{studentExperience.jobdetails}</label>
        </React.Fragment>
        )
    }
}


export default graphql(getStudentQuery, {
  options: () =>{
      return {variables: { username: localStorage.getItem("username") }}
  }})(Experience);
