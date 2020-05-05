import { gql } from 'apollo-boost';

const getStudentQuery = gql`
    query($username: String){
        student(username: $username) {
            username,
            email,
            password,
            basicDetails {
              name,
              dob,
              city,
              state,
              country,
              contactno,
              objective,
              skills
            },
            studentEducation {
              colgname,
              location,
              degree,
              major,
              yearofpassing,
              cgpa
            },
            studentExperience {
              companyname,
              companylocation,
              title,
              startdate,
              enddate,
              jobdetails
            }
        }
    }
`;

const getJobSearchQuery = gql`
    query getJobSearchQuery($searchby: String){
        jobsearch(searchby: $searchby) {
           title,
           createdate,
           enddate,
           location,
           salary,
           description,
           type,
           createdby,
           username,
           studentsapplied {
                username,
                applicationdate,
                status
           }
        }
    }
`;


export { getStudentQuery, getJobSearchQuery };