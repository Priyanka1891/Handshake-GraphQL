import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
import StudentSignIn from './Student/StudentSignIn';
import EmployerSignIn from './Employer/EmployerSignIn';
import EmployerSignUp from './Employer/EmployerSignUp';
import StudentSignUp from './Student/StudentSignUp';

import StudentProfilePage from './Student/StudentProfilePage';
import StudentJobs from './Student/StudentJobs';
import Editdetails from './Student/Editdetails';
import EditEducationDetails from './Student/EditEducationDetails';
import EditExperiencedetails from './Student/EditExperiencedetails';
import StudentList from './Student/StudentList';
import ViewJobDetails from './Student/ViewJobDetails';
import StudentApplications from './Student/StudentApplications';


import EmployerProfilePage from './Employer/EmployerProfilePage';
import EditEmployerDetails from  './Employer/EditDetails';
import EmployerJobs from './Employer/EmployerJobs';
import EmployerSearchStudent from './Employer/EmployerSearchStudent';
import PostJob from './Employer/PostJob';


// Create a Main Component
class Main extends Component {
  render() {
    return(
      <div>
        {/* Render Different Component based on Route */}
        <Route exact="true" path="/" component={Login} />
        <Route path="/student" component={StudentSignIn} />
        <Route path="/employer" component={EmployerSignIn} />
        <Route path="/studentsignup" component={StudentSignUp} />
        <Route path="/employersignup" component={EmployerSignUp} />

        {/* Student pages routing */}
        <Route path="/studentprofilepage" component={StudentProfilePage} />
        <Route path="/viewstudentprofilepage" component={StudentProfilePage} />
        <Route path="/studentjobs" component={StudentJobs} />
        <Route path="/editdetails" component={Editdetails} />
        <Route path="/editeducationdetails" component={EditEducationDetails} />
        <Route path='/editexperiencedetails' component={EditExperiencedetails} />
        <Route path='/studentlist' component={StudentList} />
        <Route path='/viewjobdetails' component={ViewJobDetails} />
        <Route path='/studentapplications' component={StudentApplications} />


        {/* Employer pages routing */}
        <Route path="/employerprofilepage" component={EmployerProfilePage} />
        <Route path="/editemployerdetails" component={EditEmployerDetails} />
        <Route path="/employerjobs" component={EmployerJobs} />
        <Route path="/employersearchstudents" component={EmployerSearchStudent} />
        <Route path="/postjob" component ={PostJob} />
      </div>
        )
    }
}

// Export The Main Component
export default Main;        