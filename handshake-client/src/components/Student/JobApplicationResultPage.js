import React, {Component} from 'react';


class JobApplicationResultPage extends Component {

  constructor(props){
    super(props);
    this.getApplicationDate = this.getApplicationDate.bind(this);
    this.getApplicationStatus = this.getApplicationStatus.bind(this);
  }


  getApplicationDate=(i)=>{
    var studentsapplied = this.props.jobs[i].studentsapplied;
    for (var idx =0 ; idx < studentsapplied.length ; ++idx) {
      if (studentsapplied[idx].username === localStorage.getItem("username")) {
        return studentsapplied[idx].applicationdate;
      }
    }
  }

  getApplicationStatus=(i)=>{
    var studentsapplied = this.props.jobs[i].studentsapplied;
    for (var idx =0 ; idx < studentsapplied.length ; ++idx) {
      if (studentsapplied[idx].username === localStorage.getItem("username")) {
        return studentsapplied[idx].status;
      }
    }
  }
  listResults(){
      const results = this.props.jobs.map((job, index) => {
         return ( 
          <React.Fragment>
              <tr>
               <th scope="row" className="text-center">{job.title}</th>
               <td>{this.getApplicationDate(index)}</td>
               <td>{this.getApplicationStatus(index)}</td>
              </tr>
           </React.Fragment>
          );
      });
     return results;
  }
 
  render() {
    return(
      <React.Fragment>{this.props.jobs.length?<div>
        <table className="table table-borderless table-hover">
         <thead className="thead-dark">
          <tr>
            <th className="text-center">Title</th>
            <th className="text-center">Date Applied</th>
            <th className="text-center">Application Status</th>
          </tr>
          </thead>
          <tbody>
            {this.listResults()}
          </tbody>
        </table>
        </div>:<div></div>}
      </React.Fragment> 
    )
  }    
}


export default JobApplicationResultPage;
