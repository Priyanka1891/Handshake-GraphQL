import React, {Component} from 'react';
import EmployerNavbar from './EmployerNavbar';
import JobResultPage from './JobResultPage';
import {Redirect} from 'react-router';
import { withApollo } from 'react-apollo';
import {getEmployerQuery, getJobSearchQuery } from '../../queries/queries';


const initialState={
  postNewJob : false,
  jobQuery : null,
  jobList : null,
}

class EmployerJobs extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.listJobResults = this.listJobResults.bind(this);
    this.postJob = this.postJob.bind(this);
  }


  listJobResults = async(e) => {
    e.preventDefault();
    var response =  await this.props.client.query({query: getEmployerQuery, 
      variables : {
        username: localStorage.getItem('username')
      },
      fetchPolicy: 'no-cache'
    });
    response =  await this.props.client.query({query: getJobSearchQuery, 
                        variables : {searchby : response.data.employer.name},
                        fetchPolicy: 'no-cache'
                      });
    this.setState({
    jobList : response.data.jobsearch
    })
  }
  
  postJob = (e) => {
    e.preventDefault();
    this.setState({
      postNewJob : true
    })
  }

  render() {
    let resultPage = null;
    if(this.state.jobList){
      resultPage = this.state.jobList ? (<JobResultPage jobDetails = {this.state.jobList}></JobResultPage>) : null;
    }

    let redirectVar = null;
    if (this.state.postNewJob) {
      redirectVar = <Redirect to = "/postjob" />
    }

    return(
      <React.Fragment>
        {redirectVar}
        <EmployerNavbar />
        <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
        <script src="http://code.jquery.com/jquery-1.11.1.min.js" />
        <link rel="stylesheet" href="style.css"  />
        <div className="container">
          <div className="login-form">
              <div className="panel">
                  <br />
                  <button className="btn btn-success" type='submit'onClick={this.postJob}>Post Job</button>
                  <br />
                  <br />
                  <button className="btn btn-success" type='submit'onClick={this.listJobResults}>List Jobs</button>
                  <br />
                {resultPage}
              </div>
          </div>
        </div> 
      </React.Fragment> 
    )
  }
}

export default withApollo(EmployerJobs);

