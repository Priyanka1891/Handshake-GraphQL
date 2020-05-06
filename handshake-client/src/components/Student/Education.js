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


  editStudentDetails = (e) =>{
    this.setState({
      editEducationDetails : true
    })
  }

  render(){
      let redirectVar = null;
      const student = this.props.student;
      if (this.state.editEducationDetails) {
        redirectVar = <Redirect to='/editeducationdetails'/>
      }
      return(
        <React.Fragment> 
        {redirectVar}
                  <h2>Education Overview&nbsp;&nbsp;&nbsp;{this.props.edit && student.studentEducation?(<button type="button" onClick={this.editStudentDetails} className="btn btn-default btn-sm"><span className="glyphicon glyphicon-pencil"></span>
                  </button>) :null } </h2>
                  {student.studentEducation ?
                  <label>College Name :&nbsp;
                  {student.studentEducation.colgname}</label>:null}
                  <br />
                  {student.studentEducation ?
                  <label>Location :&nbsp;{student.studentEducation.location}</label>:null}
                  <br />
                  {student.studentEducation  ?
                  <label>Degree :&nbsp;{
                  student.studentEducation.degree}</label> : null}
                  <br />
                  {student.studentEducation  ?
                  <label>Major :&nbsp;{
                  student.studentEducation.major}</label> : null}
                  <br />
                  {student.studentEducation ?
                  <label>Year of Passing :&nbsp;{
                  student.studentEducation.yearofpassing}</label>: null}
                  <br />
                  {student.studentEducation ?
                  <label>CGPA :&nbsp;{
                  student.studentEducation.cgpa}</label> : null}  
          </React.Fragment>
        )
    }
}

  
export default Education;
// export default graphql(getStudentQuery, {
//   options: () => {
//       return { variables: { username: localStorage.getItem("username") }}
//   }})(Education);