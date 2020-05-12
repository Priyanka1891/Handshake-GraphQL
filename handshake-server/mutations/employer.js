const { Employers } = require("../dbSchema/EmployerModel");
const { secret } = require('../config');
const CryptoJS = require('crypto-js');


const employer =
 {
    employerlogin : async (args) => {
        try {
            let user = await Employers.findOne({ username: args.username });
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

    employersignup : async(args) => {
        console.log("Employer signup ", args);
        try {
            let employer = await Employers.findOne({ username: args.username });
            if (employer) {
                return {status: 401, message: "USER ALREADY EXISTS" };
            }
            var ecPasswd = CryptoJS.AES.encrypt(args.password, secret);
            ecPasswd = ecPasswd.toString();
            var newEmployer = new Employers({
              username : args.username,
              email : args.email,
              password : ecPasswd,
              location : args.location
            });
            await newEmployer.save();
            return {status: 200, message: "User signed up successfully"};
        } catch (err) {
            console.log(err);
            return {status: 500, message: "Server error"};
        } 
    },

    updateEmployerDetails : async (args) => {
        var details  = { name : args.name,
                         contactno : args.contactno,
                         description : args.description,
                         location : args.location}
        try {                        
            await Employers.updateOne({"username" : args.username}, {$set : details});
            return { status: 200, message: "Details edited successfully" };
        } catch (err) {
            return { status: 500, message: "Server error"};
        }
    },
}


module.exports = employer;