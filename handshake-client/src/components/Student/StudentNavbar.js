/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{Component} from 'react';
import {Link} from 'react-router-dom';

// create the Navbar Component
class StudentNavbar extends Component {

    render(){
        return(
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand">Handshake</a>
              </div>
              <ul className="nav navbar-nav">
                <li><Link to= {{pathname:"/studentprofilepage", state : {edit: true}}} ><span className="glyphicon glyphicon-home" /></Link></li>
                <li><Link to="/studentjobs" >Jobs</Link></li>
                <li><Link to="/studentapplications"  >Applications</Link></li>
                <li><Link to="/studentlist" >Students</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/">
                    <span className="glyphicon glyphicon-off" />
                    &nbsp;Logout
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        )
    }
}

// function mapStateToProps(state) {
//   return {
//     studentDetails : state.login.studentDetails
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     fillStudentDetails : (details) => dispatch(fillStudentDetails(details))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(StudentNavbar);
export default StudentNavbar;

