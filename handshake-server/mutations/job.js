const { Jobs} = require("../dbSchema/JobModel");

const job =
 {
  applyJob :  async(args) => {
      var today = new Date().toISOString().slice(0,10);    
      var studentdetail = {};
      studentdetail.username = args.username;
      studentdetail.applicationdate = today;
      studentdetail.status = "NA";
      try {
        const data = await Jobs.findById({ _id : args.jobid });
        for(let idx=0; idx < data.studentsapplied.length; idx++){
          if (data.studentsapplied[idx].username === args.username) {
            return {status: 200, message: "Already applied"};
          }
        }
        await Jobs.updateOne({ _id : args.jobid}, {$addToSet : {studentsapplied: studentdetail}});
        return {status: 200, message: "Job applied successfully"};
      } catch (err) {
        return {status: 500, message: "Server error"};
      }
    },
   
 }


module.exports = job;