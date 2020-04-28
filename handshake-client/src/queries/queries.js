import { gql } from 'apollo-boost';

const getRestaurantsQuery = gql`
    query($input: String){
        restaurants(input: $input) {
            res_name
            res_cuisine
            res_address
            res_phone_number
            res_zip_code
            owner_user_id
        }
    }
`;

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

const getOwnerQuery = gql`
    query($user_id: String){
        owner(user_id: $user_id) {
            name
            email_id
            address
            phone_number
            restaurant {
                res_name
                res_cuisine
                res_zip_code
            }
        }
    }
`;

const getMenuSectionsQuery = gql`
    query($user_id: String){
        menu_sections(user_id: $user_id) {
            menu_section_name
        }
    }
`;

const getMenuQuery = gql`
    query($user_id: String){
        menu(user_id: $user_id) {
            menu_section_name
            menu_items{
                item_name
                item_description
                item_price
            }
        }
    }
`;


export { getRestaurantsQuery, getStudentQuery, getOwnerQuery, getMenuSectionsQuery, getMenuQuery };