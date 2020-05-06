import React, {Component} from 'react';
import StudentNavbar from './StudentNavbar';
import { withApollo } from 'react-apollo';
import { getJobSearchQuery } from '../../queries/queries';
import JobResultPage from './JobResultPage';


const initialState={
  searchQuery : "",
  jobList : [],
}

class StudentJobs extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.listJobResults = this.listJobResults.bind(this);
    this.queryChangeHandler = this.queryChangeHandler.bind(this);
    this.textInputSearch = React.createRef(null);
  }

  queryChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      searchQuery : e.target.value
    })
  }

  listJobResults = async(e) => {
    e.preventDefault();
    const response =  await this.props.client.query({query: getJobSearchQuery, variables : {searchby:this.state.searchQuery}});
    this.setState({
      jobList : response.data.jobsearch
    })
    // this.textInputSearch.current.value="";
  }
  
  render() {
    let resultPage = null;
    if (this.state.jobList) {
      resultPage = (<JobResultPage jobDetails = {this.state.jobList}></JobResultPage>)
    }
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
                    <label>Job Search:</label>
                    <br />
                    <div display='flex'>
                      <input onChange = {this.queryChangeHandler} ref={this.textInputSearch}
                      style={{width:'80%'}}type="text" placeholder="Enter Company Name or Job Title to Search"/>&nbsp;
                      <button className="btn btn-success" type='submit'onClick={this.listJobResults}><i className="fa fa-search"></i></button>
                    </div>
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


export default withApollo(StudentJobs);