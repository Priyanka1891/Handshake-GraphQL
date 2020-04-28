const {Users} = require("../dbSchema/UserModel");

const student =
 {
    updateStudentDetails : async (args) => {
        var details  = { email : args.email }
        details.basicDetails = {name : args.name, contactno : args.contactno,
                                dob : args.dob, city : args.city, state : args.state,
                                country :  args.country, objective : args.objective,
                                skills : args.skills}
        await Users.updateOne({"username" : args.username}, {$set : details});
        return { status: 200, message: "Details edited successfully" };
    }
 }

module.exports = student;