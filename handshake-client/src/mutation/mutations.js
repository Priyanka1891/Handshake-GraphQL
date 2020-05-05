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

export {studentSignupMutation, studentLoginMutation, updateStudentDetailsMutation};