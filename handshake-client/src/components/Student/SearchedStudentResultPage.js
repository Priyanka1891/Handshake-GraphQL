import React, {Component} from 'react';
import {Redirect} from 'react-router';


const initialState={
  studentusername : null
}

class SearchedStudentResultPage extends Component {

  constructor(props){
    super(props);
    this.state = initialState;
    this.renderSearchedStudents = this.renderSearchedStudents.bind(this);
    this.redirectStudentProfile = this.redirectStudentProfile.bind(this);
  }

  redirectStudentProfile = (e) => {
    this.setState({
      studentusername : e.target.value
    });
  }

  renderSearchedStudents = () => {
    const students = this.props.students.map((item, index) => {
      if (item.username === localStorage.getItem("username")) {
        return (<div/>)
      }
      return ( 
        <div key={item.username}>
            <h2>{item.username}</h2>
            <div className = "">
              <button className="btn btn-link" type="submit" 
               value = {item.username} onClick={this.redirectStudentProfile}>
               Click to view Profile
              </button>
            </div>
            <br/>
        </div>
      );
    });
    return students;
  }
 
  render() {
    let redirectVar = null;
    if (this.state.studentusername) {
      redirectVar = <Redirect to={{pathname: "/viewstudentprofilepage", 
                      state: {username: this.state.studentusername}}} />
    }
    return(
      <React.Fragment>
        {redirectVar}
        <div className="row-container">{this.renderSearchedStudents()}</div>
      </React.Fragment> 
    )
  }    
}

export default SearchedStudentResultPage;
