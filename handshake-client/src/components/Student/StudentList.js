import React, {Component} from 'react';
import StudentNavbar from './StudentNavbar';
import SearchedStudentResultPage from './SearchedStudentResultPage';
import { withApollo } from 'react-apollo';
import { getStudentSearchQuery } from '../../queries/queries';



const initialState={
  studentQuery : "",
  studentList : null,
}

class StudentList extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.listStudentResults = this.listStudentResults.bind(this);
    this.queryChangeHandler = this.queryChangeHandler.bind(this);
  }

  queryChangeHandler = (e) => {
    this.setState({
      studentQuery : e.target.value
    })
  }

  componentDidMount= async()=>{
    const response =  await this.props.client.query({query: getStudentSearchQuery,
                                                     variables : {searchby:this.state.studentQuery},
                                                     fetchPolicy: 'no-cache'});
    this.setState({
      studentList : response.data.studentsearch
    })
  }

  listStudentResults = async(e) => {
    e.preventDefault();
    const response =  await this.props.client.query({query: getStudentSearchQuery,
                                                    variables : {searchby:this.state.studentQuery}});
    this.setState({
      studentList : response.data.studentsearch
    })
   
  }

  render() {
    let resultPage = null;
    if (this.state.studentList) {
      resultPage = (<SearchedStudentResultPage students = {this.state.studentList}></SearchedStudentResultPage>);
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
                <label>Student Search:</label>
                <br />
                <input onChange = {this.queryChangeHandler} 
                    type ='text' style={{width:'70%'}} placeholder="Enter Student Name or College Name to Search"/>&nbsp;&nbsp;
                <button  className="btn btn-success" type='submit'onClick={this.listStudentResults}><i className="fa fa-search"></i></button>
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


export default withApollo(StudentList);
