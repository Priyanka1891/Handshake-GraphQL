import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { getStudentQuery } from '../../queries/queries';
import StudentNavbar from './StudentNavbar';
import EmployerNavbar from '../Employer/EmployerNavbar'
import Details from './Details';
import Education from './Education';
import Experience from './Experience';


const initialState={
}

class StudentProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

 

  render() {
    console.log("props ", this.props.location);
    const edit  = this.props.location.state.edit;
    if (!this.props.data.student) {
      return (<div/>)
    }

    return(
      <React.Fragment>
        {edit ? <StudentNavbar /> : <EmployerNavbar/>}
        <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
        <script src="http://code.jquery.com/jquery-1.11.1.min.js" />
        <link rel="stylesheet" href="style.css"  />
        <div className="container">
          <div className="row profile">
            <div className="col-md-3">
              <div className="profile-sidebar">
              {/* <div className="profile-userpic">
                  <img src="https://static.change.org/profile-img/default-user-profile.svg" className="img-responsive" alt="" />
                </div>  */}
                <div className="profile-usertitle">
                  <div className="profile-usertitle-name">
                    Welcome&nbsp;{this.props.data.student.username}
                  </div>
                  <div className="profile-usertitle-job">
                  {this.props.data.student.studentExperience.length ? 
                    this.props.data.student.studentExperience[this.props.data.student.studentExperience.length-1].title : null}
                  </div>
                </div>
                <div className="profile-usermenu">
                  <ul className="nav">
                    <li className="active">
                      <a href="#Details">
                        <i className="glyphicon glyphicon-user" />
                        Profile Overview
                        {' '}
                      </a>
                    </li>
                    <li>
                      <a href="#Education">
                        <i className="glyphicon glyphicon-book" />
                        Education
                        {' '}
                      </a>
                    </li>
                    <li>
                      <a href="#Experience">
                        <i className="glyphicon glyphicon-briefcase" />
                        Experience
                        {' '}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-offset-0">
              <div className="profile-content">
              <div className="col-md-offset-4">
                <div id='Details'><Details edit={ edit } /></div>
                <div id='Education'><Education edit={ edit } /></div>
                <div id='Experience'><Experience edit={ edit } /></div>
                {/* <h2  id='Education'>Education Overview&nbsp;&nbsp;
                { edit ?
                 <button type="button" onClick = {this.addStudentEducation} className="btn btn-default btn-sm"><span className="glyphicon glyphicon-plus-sign"></span></button> : <div/>}</h2>
                <div>
                  {
                    this.props.data.student.studentEducation.map((education,index) => (
                      <div><Education edit = {edit} index={this.props.data.student.studentEducation.length - 1 - index} /></div>
                    ))
                  }
                </div>
                <h2 id='Experience'>Experience Overview&nbsp;&nbsp;
                { edit ? 
                  <button type="button" onClick = {this.addStudentExperience} className="btn btn-default btn-sm"><span className="glyphicon glyphicon-plus-sign"></span></button> :<div/>}</h2>
                  <div>
                  {
                    this.props.data.student.studentExperience.map((experience,index) => (
                      <div><Experience edit = {edit} index={this.props.data.student.studentExperience.length - 1 - index} /></div>
                    ))
                  } */}
                </div>
                <br/>
                </div> 
              </div>
            </div>
          </div>
        {/* </div> */}
      </React.Fragment>
    )
  }
}


export default graphql(getStudentQuery, {
    options: {
        variables: { username: localStorage.getItem("username") }
    }
  })(StudentProfilePage);





