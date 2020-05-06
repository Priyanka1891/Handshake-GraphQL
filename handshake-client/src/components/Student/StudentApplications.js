import React, {Component} from 'react';
import StudentNavbar from './StudentNavbar';
import JobApplicationResultPage from './JobApplicationResultPage';
import { graphql } from 'react-apollo';
import {getJobsAppliedQuery} from '../../queries/queries';

class StudentApplications extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let resultPage = null;
    if (!this.props.data.jobsapplied) {
      return <div/>
    }
    const jobs = this.props.data.jobsapplied;
    resultPage = (<JobApplicationResultPage jobs = {jobs}></JobApplicationResultPage>);
    return(
        <React.Fragment>
        <StudentNavbar />
        <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
        <script src="http://code.jquery.com/jquery-1.11.1.min.js" />
        <link rel="stylesheet" href="style.css"  />
        <div className="container">
          <div className="login-form">
            <div className="panel">
              <div>
                <br/>
                <label>Jobs Applied :</label>
                <br />
                <br />
                {resultPage}
              </div>
            </div>
          </div>
        </div> 
        </React.Fragment>
      )
  }
}

export default graphql(getJobsAppliedQuery, {
  options: () => {
    return {variables: { username: localStorage.getItem("username") }}
  }
})(StudentApplications);
