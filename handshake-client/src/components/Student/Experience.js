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

  deleteStudentDetails = (e) =>{
    e.preventDefault();
  }

  render(){
      let redirectVar = null;
      if (this.state.editExperienceDetails) {
        redirectVar = <Redirect to={{pathname :'/editexperiencedetails',state:this.props.index}}/>
      }
      return(
        <React.Fragment>
        {redirectVar}
        {this.props.edit?(<button type="button" onClick={this.editStudentDetails} className="btn btn-default btn-sm"><span className="glyphicon glyphicon-pencil"></span>
                  </button>) :(<div></div>)} 
                  &nbsp;&nbsp;{this.props.edit?(<button type="button" onClick={this.deleteStudentDetails} className="btn btn-default btn-sm">
                  <span className="glyphicon glyphicon-trash"></span>
                  </button>):(<div></div>)} 
                  <br />
                  <label>Company Name :&nbsp;{this.props.data.student.studentExperience.length?this.props.data.student.studentExperience[this.props.index].companyname:null}</label>
                  <br />
                  <label>Job Title :&nbsp;{this.props.data.student.studentExperience.length?this.props.data.student.studentExperience[this.props.index].title:null}</label>
                  <br />
                  <label>Company Location :&nbsp;{this.props.data.student.studentExperience.length?this.props.data.student.studentExperience[this.props.index].companylocation:null}</label>
                  <br />
                  <label>Start Date :&nbsp;{this.props.data.student.studentExperience.length?this.props.data.student.studentExperience[this.props.index].startdate:null}</label>
                  &nbsp;&nbsp;
                  <label>End Date :&nbsp;{this.props.data.student.studentExperience.length?this.props.data.student.studentExperience[this.props.index].enddate:null}</label>
                  <br />
                  <label>Job Details :&nbsp;{this.props.data.student.studentExperience.length?this.props.data.student.studentExperience[this.props.index].jobdetails:null}</label>
        </React.Fragment>
        )
    }
}


export default graphql(getStudentQuery, {
  options: {
      variables: { username: localStorage.getItem("username") }
  }})(Experience);
