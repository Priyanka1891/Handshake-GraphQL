import React, {Component, createRef} from 'react';
// import { graphql } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { getEmployerQuery } from '../../queries/queries';
import EmployerNavbar from './EmployerNavbar';
import Details from  './Details';
import StudentNavbar from '../Student/StudentNavbar';


const initialState={
  reRender : false,
  employer : null
}
var inputFile = createRef(null) 


class EmployerProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount = async() => {
    var username;
    if (this.props.location.state) {
      username = this.props.location.state.username;
    } else {
      username = localStorage.getItem('username');
    }
    const response =  await this.props.client.query({query: getEmployerQuery, 
                        variables : {
                          username: username
                        },
                        fetchPolicy: 'no-cache'
                      });
    this.setState({
      employer : response.data.employer
    })
  }


  render() {
    if (!this.state.employer) {
      return <div/>
    }
    const employer = this.state.employer;
    const edit  = (employer.username === localStorage.getItem("username"));
    return(
      <React.Fragment>
        {  edit ? <EmployerNavbar /> : <StudentNavbar />  }
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
                    Welcome&nbsp;{employer.username}
                  </div>)
                  :
                  (<div className="profile-usertitle-name">
                    {employer.username}
                  </div>) }
                </div>
                <div className="profile-usermenu">
                  <ul className="nav">
                    <li className = "active">
                      <a href="">
                        <i className="glyphicon glyphicon-user" />
                        Profile Overview
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
                <div id='Details'><Details edit={edit} employer={employer}/></div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment> 
    )
  }
}

export default withApollo(EmployerProfilePage);
