import React, {Component} from 'react';
import StudentNavbar from './StudentNavbar';
import {Redirect} from 'react-router';
import { graphql } from 'react-apollo';
import { studentLoginMutation } from '../../mutation/mutations';


const initialState={
  canceljob : false,
  renderemployer : false
}

class ViewJobDetails extends Component {
  constructor(props){
    super(props);
    this.state=initialState;
    this.applyJob = this.applyJob.bind(this);
    this.cancelJob = this.cancelJob.bind(this);
  }
 
  applyJob = (e) =>{
    e.preventDefault();
    const data = {
      jobId : this.props.location.state._id,
      username : localStorage.getItem("username")
    };
    // axios.defaults.withCredentials = true;
    // axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    // console.log("Sending Data "+ JSON.stringify(data));
    // axios.post(`${backendURL}/jobs/jobsapplied`,data)
    //   .then(response => {
    //     console.log("Entered inside axios post req");
    //     if(response.data){
    //       window.alert(response.data);
    //     }
    // });
  }

  redirectEmployerProfile = (e) => {
    this.setState({
      renderemployer : true
    });
  }
 
  cancelJob=()=>{
    this.setState({
      canceljob : true
    })
  }

  render() {
    let redirectVar = null;
    const job = this.props.location.state.job;
    if (this.state.canceljob) {
      redirectVar = <Redirect to='/studentjobs' />
    }   
    else if(this.state.renderemployer) {
      redirectVar = <Redirect to={{pathname: "/employerprofilepage", state: {username: job.username}}} />
    }
    return(
        <React.Fragment>
          {redirectVar}
        <StudentNavbar/>
        <div className="container">
          <h2>{this.props.location.state.title}</h2>
          <br />
          <div className="card">
           <div className="card-body">
            <label for="usr">Create Date :&nbsp;&nbsp;&nbsp;{job.createdate}</label>
            <label for="usr">End Date :&nbsp;&nbsp;&nbsp;{job.enddate}</label>
            <label for="usr">Location :&nbsp;&nbsp;&nbsp;{job.location}</label>
            <label for="usr">Salary :&nbsp;&nbsp;&nbsp;{job.salary}</label>
            <label for="usr">Job Type :&nbsp;&nbsp;&nbsp;{job.type}</label>
            <label for="usr">Company Name :&nbsp;&nbsp;&nbsp;{job.createdby}</label>
            <br/>
            <button type="button"onClick={this.redirectEmployerProfile}className="btn btn-link">Click to view {job.createdby} profile</button>
            <br/>
            <br/>
            <button type="button" onClick={this.applyJob}className="btn btn-success">Apply</button>
            &nbsp;&nbsp;
            <button type="button"onClick={this.cancelJob}className="btn btn-danger">Cancel</button>  
           </div>
          </div>
          <br/>
          <br/>
         
        </div>
        </React.Fragment>
      )
  }
}


export default graphql(studentLoginMutation, { name: "studentLoginMutation" })(ViewJobDetails);



