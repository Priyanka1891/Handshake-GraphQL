import { gql } from 'apollo-boost';

const addCustomerMutation = gql`
    mutation AddCustomer($name: String, $email_id: String, $password: String, $address: String, $phone_number: String){
        addCustomer(name: $name, email_id: $email_id, password: $password, address: $address, phone_number: $phone_number){
            message
            status
        }
    }
`;

const addOwnerMutation = gql`
    mutation AddOwner($name: String, $email_id: String, $password: String, $address: String, $phone_number: String, $res_name: String, $res_cuisine: String, $res_zip_code: String){
        addOwner(name: $name, email_id: $email_id, password: $password, address: $address, phone_number: $phone_number, res_name: $res_name, res_cuisine: $res_cuisine, res_zip_code: $res_zip_code){
            message
            status
        }
    }
`;

const loginMutation = gql`
    mutation login($username: String, $password: String){
        login(username: $username, password: $password){
            message
            status
        }
    }
`;

// name: this.state.name || student.basicDetails.name,
// contactno : this.state.contactno || student.basicDetails.contactno,
// dob: this.state.dob || student.basicDetails.dob ,
// city: this.state.city || student.basicDetails.city,
// state: this.state.state || student.basicDetails.state,
// country: this.state.country || student.basicDetails.country,
// objective: this.state.objective || student.basicDetails.objective,
// skills: this.state.skills || student.basicDetails.skills,

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

const updateOwnerMutation = gql`
    mutation updateOwner($name: String, $email_id: String, $password: String, $address: String, $phone_number: String, $res_name: String, $res_cuisine: String, $res_zip_code: String){
        updateOwner(name: $name, email_id: $email_id, password: $password, address: $address, phone_number: $phone_number, res_name: $res_name, res_cuisine: $res_cuisine, res_zip_code: $res_zip_code){
            message
            status
        }
    }
`;

const addMenuSectionMutation = gql`
    mutation addMenuSection($user_id: String, $menu_section_name: String){
        addMenuSection(user_id: $user_id, menu_section_name: $menu_section_name){
            message
            status
        }
    }
`;

const addMenuItemMutation = gql`
    mutation addMenuItem($user_id: String, $menu_section_name: String, $item_name: String, $item_description: String, $item_price: String){
        addMenuItem(user_id: $user_id, menu_section_name: $menu_section_name, item_name: $item_name, item_description: $item_description, item_price: $item_price){
            message
            status
        }
    }
`;

export {addCustomerMutation, addOwnerMutation, loginMutation, updateStudentDetailsMutation, updateOwnerMutation, addMenuSectionMutation, addMenuItemMutation};