import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { getStudentQuery } from '../../queries/queries';
import StudentNavbar from './StudentNavbar';
import EmployerNavbar from '../Employer/EmployerNavbar'
import Details from './Details';
import Education from './Education';
import Experience from './Experience';

class StudentProfilePage extends Component {
  constructor(props) {
    super(props);
  }

 
  render() {
    if (!this.props.data.student) {
      return (<div/>)
    }
    const edit  = (this.props.data.student.username === localStorage.getItem("username"));
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
                </div>
                <br/>
                </div> 
              </div>
            </div>
          </div>
      </React.Fragment>
    )
  }
}


export default graphql(getStudentQuery, {
  options: () => {
    return {variables: { username: localStorage.getItem("username") }}
  }
})(StudentProfilePage);





