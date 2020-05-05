import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { graphql } from 'react-apollo';
import { getStudentQuery} from '../../queries/queries';


const initialState={
  editEducationDetails : false,
  detailsSubmitted : false,
}

class Education extends Component{

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  dispatch = async (state) => {
    await this.props.fillStudentDetails(state);
    return this.props.data.student;
  }


  editStudentDetails = (e) =>{
    this.setState({
      editEducationDetails : true
    })
  }


  // deleteStudentDetails = (e) =>{
  //   e.preventDefault();
  //   const data = {index : this.props.studentDetails.studentEducation._id,
  //                 delete_education_details : true}
  //   var studentDetails=this.props.studentDetails;
  //   studentDetails.studentEducation.splice(this.props.index, 1);
  //   axios.defaults.withCredentials = true;
  //   axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  //   axios.post(`${backendURL}/student/deletedetails`, data)
  //     .then(response => {
  //       console.log("Delete Education Response: ", response);
  //       if (response.status === 200) {
  //         this.dispatch(studentDetails)
  //           .then(result => {
  //             this.setState({
  //               detailsSubmitted : true
  //             })
  //           })
  //       }
  //   });
  // }

  render(){
      let redirectVar = null;
      if (this.state.editEducationDetails) {
        redirectVar = <Redirect to='/editeducationdetails'/>
      }
      return(
        <React.Fragment> 
        {redirectVar}
                  <h2>Education Overview&nbsp;&nbsp;&nbsp;{this.props.edit && this.props.data.student.studentEducation?(<button type="button" onClick={this.editStudentDetails} className="btn btn-default btn-sm"><span className="glyphicon glyphicon-pencil"></span>
                  </button>) :null } </h2>
                  {this.props.data.student.studentEducation ?
                  <label>College Name :&nbsp;
                  {this.props.data.student.studentEducation.colgname}</label>:null}
                  <br />
                  {this.props.data.student.studentEducation ?
                  <label>Location :&nbsp;{this.props.data.student.studentEducation.location}</label>:null}
                  <br />
                  {this.props.data.student.studentEducation  ?
                  <label>Degree :&nbsp;{
                  this.props.data.student.studentEducation.degree}</label> : null}
                  <br />
                  {this.props.data.student.studentEducation  ?
                  <label>Major :&nbsp;{
                  this.props.data.student.studentEducation.major}</label> : null}
                  <br />
                  {this.props.data.student.studentEducation ?
                  <label>Year of Passing :&nbsp;{
                  this.props.data.student.studentEducation.yearofpassing}</label>: null}
                  <br />
                  {this.props.data.student.studentEducation ?
                  <label>CGPA :&nbsp;{
                  this.props.data.student.studentEducation.cgpa}</label> : null}  
          </React.Fragment>
        )
    }
}

  
export default graphql(getStudentQuery, {
  options: () => {
      return { variables: { username: localStorage.getItem("username") }}
  }})(Education);