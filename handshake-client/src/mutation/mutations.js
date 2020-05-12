import { gql } from 'apollo-boost';

const studentSignupMutation = gql`
    mutation studentsignup($username: String, $password: String, $email: String, $colgname: String){
        studentsignup(username: $username, password: $password, email: $email, colgname: $colgname){
            message
            status
        }
    }
`;

const studentLoginMutation = gql`
    mutation studentlogin($username: String, $password: String){
        studentlogin(username: $username, password: $password){
            message
            status
        }
    }
`;

const updateStudentDetailsMutation = gql`
    mutation updateStudentDetails($username: String, $email: String,
        $name: String, $contactno: String, $dob: String, $city: String, $state: String, $country: String,
        $objective: String, $skills: String){
        updateStudentDetails(username: $username, email: $email,  name: $name, contactno : $contactno,
            dob: $dob, city: $city, state: $state, country: $country, objective : $objective, 
            skills : $skills){
            message
            status
        }
    }
`;

const updateStudentEducationDetailsMutation = gql`
    mutation updateStudentEducationDetails($username: String, $colgname: String, $location: String,
        $degree: String, $major: String, $yearofpassing:  String, $cgpa: String) {
            updateStudentEducationDetails(username: $username, colgname: $colgname, location: $location,
                degree: $degree, major: $major, yearofpassing: $yearofpassing, cgpa: $cgpa)  {
                    message
                    status
            }
        }
`;

const updateStudentExperienceDetailsMutation = gql`
    mutation updateStudentExperienceDetails($username: String, $companyname: String, $companylocation: String,
        $title: String, $startdate: String, $enddate:  String, $jobdetails: String) {
            updateStudentExperienceDetails(username: $username, companyname: $companyname, companylocation: $companylocation,
                title: $title, startdate: $startdate, enddate: $enddate, jobdetails: $jobdetails)  {
                    message
                    status
            }
        }
`;

const applyJobMutation = gql`
    mutation applyJobMutation($username: String, $jobid: String){
        applyJob(username: $username, jobid: $jobid){
            message
            status
        }
    }
`;

const employerLoginMutation = gql`
    mutation employerlogin($username: String, $password: String){
        employerlogin(username: $username, password: $password){
            message
            status
        }
    }
`;

const employerSignupMutation = gql`
    mutation employersignup($username: String, $password: String, $email: String, $location : String){
        employersignup(username: $username, password: $password, email: $email, location : $location){
            message
            status
        }
    }
`;

const updateEmployerDetailsMutation = gql`
    mutation updateEmployerDetails($username: String, $location: String,
        $name: String, $contactno: String, $description: String){
        updateEmployerDetails(username: $username,  name: $name, contactno : $contactno,
            description: $description,location : $location){
            message
            status
        }
    }
`;

const postJobMutation = gql`
    mutation postJob($username: String,$createdby: String, $location: String, $type: String
        $enddate: String, $createdate: String, $description: String, $title: String, $salary: String){
        postJob(username : $username,createdby : $createdby,location : $location, type : $type
          enddate : $enddate , createdate: $createdate, description : $description, title : $title , salary: $salary){
            message
            status
        }
    }
`;

const updateApplicationStatus = gql`
  mutation updateApplicationStatus($jobid: String, $username: String, $status: String) {
    updateApplicationStatus(jobid:$jobid, username:$username, status:$status) {
      message,
      status
    }
  }
`;

export { studentSignupMutation, studentLoginMutation, updateStudentDetailsMutation,
        updateStudentEducationDetailsMutation,updateStudentExperienceDetailsMutation,
        applyJobMutation, employerLoginMutation,employerSignupMutation,updateEmployerDetailsMutation,
        postJobMutation, updateApplicationStatus };