import React, {Component} from 'react';
// import { graphql } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { getStudentQuery } from '../../queries/queries';
import StudentNavbar from './StudentNavbar';
import EmployerNavbar from '../Employer/EmployerNavbar'
import Details from './Details';
import Education from './Education';
import Experience from './Experience';

const initialState={
  student : null,
}

class StudentProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount = async() => {
    var username;
    if (this.props.location.state && this.props.location.state.username) {
      username = this.props.location.state.username;
    } else {
      username = localStorage.getItem('username');
    }
    const response =  await this.props.client.query({query: getStudentQuery, 
                        variables : {
                          username: username
                        },
                        fetchPolicy: 'no-cache'
                      });
    this.setState({
      student : response.data.student
    })
  }
 
  render() {
    if (!this.state.student) {
      return (<div/>)
    }
    const student = this.state.student;
    const isemployer = this.props.location.state ? this.props.location.state.employer : false;
    const edit = (student.username === localStorage.getItem("username"));
    return(
      <React.Fragment>
        {edit ? <StudentNavbar/> : ( isemployer ? <EmployerNavbar/> : <StudentNavbar /> )}
        <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
        <script src="http://code.jquery.com/jquery-1.11.1.min.js" />
        <link rel="stylesheet" href="style.css"  />
        <div className="container">
          <div className="row profile">
            <div className="col-md-3">
              <div className="profile-sidebar">
                <div className="profile-usertitle">
                  {edit ?
                    (<div className="profile-usertitle-name">
                      Welcome&nbsp;{student.username}
                    </div>) :
                    (<div className="profile-usertitle-name">
                      {student.username}
                    </div>)
                  }
                  <div className="profile-usertitle-job">
                  {student.studentExperience ? 
                    student.studentExperience.title : null}
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
                <div id='Details'><Details edit={ edit } student={ student }/></div>
                <div id='Education'><Education edit={ edit } student={ student } /></div>
                <div id='Experience'><Experience edit={ edit } student={ student }/></div>
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


export default withApollo(StudentProfilePage);




