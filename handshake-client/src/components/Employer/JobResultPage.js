import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {Row, Col, Pagination} from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import { getJobDetails } from '../../queries/queries';
import  { updateApplicationStatus } from '../../mutation/mutations'


const initialState={
  listStudentsApplied : null,
  studentusername : null,
  activePage: 1
}

class JobResultPage extends Component {

  constructor(props){
    super(props);
    this.state=initialState;
    // this.searchedJobs = this.searchedJobs.bind(this);
    this.getStudentDetails = this.getStudentDetails.bind(this);
    this.studentsApplied = this.studentsApplied.bind(this);
    this.redirectStudentProfile = this.redirectStudentProfile.bind(this);
    this.updateApplicationStatus  = this.updateApplicationStatus.bind(this);
  }

  componentWillMount() {
    this.setState(initialState);
  }

  componentWillReceiveProps() {
    this.setState(initialState);
  }

  changePage = (e) => {
    let page = this.state.activePage;
    if (e.target.text === ">" && page !== parseInt(e.target.name, 10)) {
        page += 1;
    } else if (e.target.text === "<" && page !== parseInt(e.target.name, 10)) {
        page -= 1;
    } else {
        page = parseInt(e.target.name, 10);
    }
    this.setState({
        activePage: page
    });
  };  

  getStudentDetails = async (e) => {
    e.preventDefault();
    var jobId = e.target.value;
    const response = await this.props.client.query({query: getJobDetails, 
                              variables : {
                                id: jobId
                              },
                              fetchPolicy: 'no-cache'
                      });
    this.setState({
      listStudentsApplied :  response.data.jobDetailsByID
    })
  }

  sectionItems (jobDetails) {
    if (this.state.listStudentsApplied) { return <div/> }

    return (
      <tr>
        <th scope="row" className="text-center">{jobDetails.title}</th>
        {/* <td>{jobDetails.createdby}</td> */}
        <td>{jobDetails.location}</td>
        <td>{jobDetails.salary}</td>
        <td>{jobDetails.type}</td>
        <td>{jobDetails.createdate}</td>
        <td>{jobDetails.enddate}</td>
        <td><button type="submit" value={jobDetails._id} className="btn btn-link" onClick={this.getStudentDetails}>View Details</button></td>
      </tr>
    )
  }

  studentsApplied = () => {
    if (!this.state.listStudentsApplied) {
      return <div></div>
    } 

    const students = this.state.listStudentsApplied.studentsapplied.map((item, index) => {
      return ( 
        <div key={item.username}>
              <div className="radio">
              <label>
              <input type="radio" value={JSON.stringify({job:item, status : 'Pending'})} checked={'pending' === item.status.toLowerCase()}
               onChange={this.updateApplicationStatus} />
                Pending
              </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label>&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="radio" value={JSON.stringify({job:item, status : 'Reviewed'})} checked={'reviewed' === item.status.toLowerCase()}
               onChange={this.updateApplicationStatus}/>
                Reviewed
              </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label>
              <input type="radio" value={JSON.stringify({job:item, status : 'Declined'})} checked={'declined' === item.status.toLowerCase()} 
               onChange={this.updateApplicationStatus}/>
                Declined
              </label>
              <br />
              <br/>
              <h2>{item.username}</h2>
              <button variant="secondary" type="submit" className="btn btn-link"
               value = {item.username}  onClick={this.redirectStudentProfile}>
               Click to view Profile
              </button>
            </div>
            </div>

      );
    });
    return students;
  }

  updateApplicationStatus = async (e) => {
    e.preventDefault();
    let value = JSON.parse(e.target.value);
    const data = {
      jobid : this.state.listStudentsApplied._id,
      username : value.job.username,
      status : value.status
    };

    const response = await this.props.client.mutate({mutation: updateApplicationStatus,
                                              variables : {
                                                jobid : data.jobid,
                                                username : data.username,
                                                status : data.status
                                              }});

    if (response.data.updateApplicationStatus.status === "200") {  
      var listStudentsApplied = this.state.listStudentsApplied;
      for (var idx =0; idx < listStudentsApplied.studentsapplied.length; ++idx) {
        if (listStudentsApplied.studentsapplied[idx].username === data.username) {
          listStudentsApplied.studentsapplied[idx].status = data.status;
          break;
        }
      }    

      this.setState({
        listStudentsApplied : listStudentsApplied
      });
    }
  }

  redirectStudentProfile = (e) => {
   this.setState({
     studentusername : e.target.value
   })
  }

  render() {
    let redirectVar = null,
            section,
            active = 1,
            itemsToShow = 4,
            pagesBar = null,
            renderOutput = [];

    if (this.state.studentusername) {
      redirectVar = <Redirect to={{pathname: "/viewstudentprofilepage", 
                                  state: {username: this.state.studentusername, employer: true}}} />
    }

    if (this.state && this.state.activePage) {
      active = this.state.activePage;
    }

    if (this.props.jobDetails && this.props.jobDetails.length > 0) {
      let sectionCount = 0;
      for (var i = (active - 1) * itemsToShow; i < this.props.jobDetails.length; i++) {
          section = this.sectionItems(this.props.jobDetails[i]);
          renderOutput.push(section);
          if (++sectionCount === itemsToShow)
              break;
      }

      let pages = [];
      let pageCount = Math.ceil(this.props.jobDetails.length / itemsToShow);

      for (let i = 1; i <= pageCount; i++) {
          pages.push(
              <Pagination.Item active={i === active} name={i} key={i} onClick={this.changePage}>
                  {i}
              </Pagination.Item>
          );
      }
      pagesBar = (
          <div>
              <br />
              <Pagination>
                  <Pagination.Prev name="1" onClick={this.changePage} />
                  {pages}
                  <Pagination.Next name={pageCount} onClick={this.changePage} />
              </Pagination>
          </div>
      );
    }

    return(
      <React.Fragment>
        {redirectVar}
        <br />{!this.state.listStudentsApplied?<div>
        <div><h2 style={{align:'center'}}>Job List :</h2></div>
        <br />
        <table className="table table-borderless table-hover">
         <thead className="thead-dark">
          <tr>
            <th className="text-center">Job Title</th>
           {/* <th className="text-center">Company Name</th> */}
           <th className="text-center">Location</th>
            <th className="text-center">Salary</th>
            <th className="text-center">Job Type</th>
            <th className="text-center">Create Date</th>
            <th className="text-center">End Date</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {renderOutput}
          </tbody>
        </table></div>:<div></div>}
        { !this.state.listStudentsApplied ?
          (<Row>
                <Col sm={4}></Col>
                <Col>{pagesBar}</Col>
          </Row>) :  <div/>}
        <div className="row-container">{this.studentsApplied()}</div>
      </React.Fragment> 
    )
  }    
}

export default withApollo(JobResultPage);
