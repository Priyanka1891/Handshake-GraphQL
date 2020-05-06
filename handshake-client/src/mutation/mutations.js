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

export {studentSignupMutation, studentLoginMutation, updateStudentDetailsMutation,
        updateStudentEducationDetailsMutation,updateStudentExperienceDetailsMutation,
        applyJobMutation};