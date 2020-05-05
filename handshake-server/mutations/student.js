const { Users } = require("../dbSchema/UserModel");
const { secret } = require('../config');
const CryptoJS = require('crypto-js');


const student =
 {
    studentlogin : async (args) => {
        try {
            let user = await Users.findOne({ username: args.username });
            if (!user) {
                return {status: 401, message: "NO_USER" };
            }
            var dcPasswd = CryptoJS.AES.decrypt(user.password, secret);
            dcPasswd = dcPasswd.toString(CryptoJS.enc.Utf8);
            if (dcPasswd !== args.password) {
                console.log("LOGIN");
                return {status: 401, message: "INCORRECT_PASSWORD" };
            }
            return {status: 200, message: user.username };
        } catch (err) {
            console.error("Error");
            return {status: 500 , message: "Server error"}
        };
    },

    studentsignup : async(args) => {
        try {
            let user = await Users.findOne({ username: args.username });
            if (user) {
                return {status: 401, message: "USER ALREADY EXISTS" };
            }
            var ecPasswd = CryptoJS.AES.encrypt(args.password, secret);
            ecPasswd = ecPasswd.toString();
            var newUser = new Users({
              username : args.username,
              email : args.email,
              password : ecPasswd,
              studentEducation : {colgname: args.colgname}
            });
            await newUser.save();
            return {status: 200, message: "User signed up successfully"};
        } catch (err) {
            return {status: 500, message: "Server error"};
        } 
    },

    updateStudentDetails : async (args) => {
        var details  = { email : args.email }
        details.basicDetails = {name : args.name, contactno : args.contactno,
                                dob : args.dob, city : args.city, state : args.state,
                                country :  args.country, objective : args.objective,
                                skills : args.skills}
        try {                        
            await Users.updateOne({"username" : args.username}, {$set : details});
            return { status: 200, message: "Details edited successfully" };
        } catch (err) {
            return { status: 500, message: "Server error"};
        }
    },
 }


module.exports = student;