import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { graphql, compose } from 'react-apollo';
import {postJobMutation } from '../../mutation/mutations';
import {getEmployerQuery} from '../../queries/queries';


const initialState={
  jobPosted : false,
  title : '',
  createdate : '',
  enddate : '',
  location : '',
  salary : '',
  description : '',
  type : '',
  companyname : ''
}

class PostJob extends Component{

  constructor(props){
      super(props);
      this.state= initialState;
      // this.state.companyname = this.props.employerDetails.name;
      this.jobTitleChangeHandler = this.jobTitleChangeHandler.bind(this);
      this.createDateChangeHandler = this.createDateChangeHandler.bind(this);
      this.endDateChangeHandler = this.endDateChangeHandler.bind(this);
      this.jobLocationChangeHandler = this.jobLocationChangeHandler.bind(this);
      this.jobSalaryChangeHandler = this.jobSalaryChangeHandler.bind(this);
      this.jobDescriptionChangeHandler = this.jobDescriptionChangeHandler.bind(this);
      this.jobTypeChangeHandler = this.jobTypeChangeHandler.bind(this);
      this.postJobDetails = this.postJobDetails.bind(this);
  }

  jobTitleChangeHandler = (e) => {
    this.setState({
      title : e.target.value
    })
  }

  createDateChangeHandler = (e) => {
    this.setState({
      createdate : e.target.value
    })
  }

  endDateChangeHandler = (e) => {
    this.setState({
      enddate : e.target.value
    })
  }

  jobLocationChangeHandler = (e) => {
    this.setState({
      location : e.target.value
    })
  }

  jobSalaryChangeHandler = (e) => {
    this.setState({
      salary : e.target.value
    })
  }

  jobDescriptionChangeHandler = (e) => {
    this.setState({
      description : e.target.value
    })
  }

  jobTypeChangeHandler = (e) => {
    this.setState({
      type : e.target.value
    })
  }

  postJobDetails = async(e) => {
    e.preventDefault();
    for (let [key, value] of Object.entries(this.state)) {
      if (key === 'jobPosted' || key === 'companyname') continue;
      if (!value) {
        var msg;
        msg = 'Enter all required fields';
        window.alert(msg);
        return;
      }
    }
    
    let mutationResponse = await this.props.postJobMutation({
      variables: {
          username: localStorage.getItem('username'),
          createdby : this.props.data.employer.name,
          title: this.state.title,
          location : this.state.location,
          createdate : this.state.createdate,
          enddate : this.state.enddate,
          description : this.state.description,
          type : this.state.type,
          salary : this.state.salary
      }
    });
    console.log(mutationResponse);
    const response = mutationResponse.data.postJob;
    if (response) {
        if (response.status === "200") {
          this.setState({
            jobPosted: true
          });
          window.alert(response.message);
        } 
    }
  }

  render() {
    let redirectVar = null;
    if (this.state.jobPosted) {
      redirectVar = <Redirect to="/employerjobs" />
    }
    if (!this.props.data.employer) {
      return <div/>;
    }
    return(
      <div>
      {redirectVar}
      <br />
      <React.Fragment>
      <div className="col-md-offset-5">
              <div className="profile-content">
              {/* <div className="col-md-offset-4"> */}
                <h2>Fill job Details</h2>
              <div className="form-group">
                <label>Job Title*</label>
                <input style={{width:"300px"}} onChange = {this.jobTitleChangeHandler}value={this.state.title} 
                type="text" className="form-control" name="colgname" />
              </div>
              <div className="form-group">
                <label>Create Date*</label>
                <input  style={{width:"300px"}} onChange = {this.createDateChangeHandler}value={this.state.createdate} 
                type="date" className="form-control" name="dob" />
              </div>
              <div className="form-group">
                <label>End Date*</label>
                <input style={{width:"300px"}} onChange = {this.endDateChangeHandler}value={this.state.enddate} 
                type="date" className="form-control" />
              </div>
              <div className="form-group">
                <label>Location*</label>
                <input style={{width:"300px"}} onChange = {this.jobLocationChangeHandler}value={this.state.location} 
                type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Salary*</label>
                <input style={{width:"300px"}} onChange = {this.jobSalaryChangeHandler}value={this.state.salary} 
                type="text" className="form-control"  />
              </div>
              <div className="form-group">
                <label>Job Description*</label>
                <input style={{width:"300px"}} onChange = {this.jobDescriptionChangeHandler}value={this.state.description} 
                type="text" className="form-control"  />
              </div>
              <div className="form-group">
                <label>Job Type*</label>
                <select id="types" onChange = {this.jobTypeChangeHandler} value={this.state.type}>
                  <option value="">----Job Type----</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="On Campus">On Campus</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <button type="button" onClick={this.postJobDetails} className="btn btn-success">Post Job</button>    
            </div>
          </div>
      </React.Fragment> 
      </div>
    )   
  }
}


export default compose(graphql(getEmployerQuery, {
  options: () => {
    return { variables: { username: localStorage.getItem("username") },
             fetchPolicy: 'no-cache'
            };
  }
}),
graphql(postJobMutation, { name: "postJobMutation" }))(PostJob);