import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { graphql } from 'react-apollo';
import { getStudentQuery} from '../../queries/queries';

const initialState={
  editDetails : false,
}

class Details extends Component{

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  editStudentDetails = (e) =>{
    this.setState({
      editDetails : true
    });
  }

  render(){
      let redirectVar = null;
      if (this.state.editDetails) {
        redirectVar = <Redirect to="/editdetails" />
      }
      return(
        <div>
        {redirectVar}
          <br />
                <h2>Profile Overview
                  &nbsp;&nbsp;{this.props.edit?(<button onClick={this.editStudentDetails} type="button" className="btn btn-default btn-sm">
                  <span className="glyphicon glyphicon-pencil"></span>
                  </button>):(<div></div>)} 
                </h2> 
                <label>Name : &nbsp;{this.props.data.student.basicDetails ?
                this.props.data.student.basicDetails.name : null}</label>
                <br />
                <label>Date Of Birth :&nbsp;{this.props.data.student.basicDetails ?
                  this.props.data.student.basicDetails.dob : null}</label>
                <br />
                <label>City :&nbsp;{this.props.data.student.basicDetails ?
                this.props.data.student.basicDetails.city : null}</label>
                <br />
                <label>State :&nbsp;{this.props.data.student.basicDetails ?
                this.props.data.student.basicDetails.state : null }</label>
                <br />
                <label>Country :&nbsp;{this.props.data.student.basicDetails ?
                this.props.data.student.basicDetails.country : null}</label>
                <br/>
                <label>Contact No :&nbsp;{this.props.data.student.basicDetails ?
                this.props.data.student.basicDetails.contactno : null}</label>
                <br/>
                <label>Email:&nbsp;{this.props.data.student.email ?
                this.props.data.student.email : null}</label>
                <br/>
                <label>Skills :&nbsp;{this.props.data.student.basicDetails?
                this.props.data.student.basicDetails.skills : null}</label>
                <br/>
                <label>Objective :&nbsp;{this.props.data.student.basicDetails ?
                this.props.data.student.basicDetails.objective : null}</label>
                {/* <br /> */}
        </div>
        ) 
    }
}


export default graphql(getStudentQuery, {
  options: () => {
      return {variables: { username: localStorage.getItem("username") }}
  }})(Details);

