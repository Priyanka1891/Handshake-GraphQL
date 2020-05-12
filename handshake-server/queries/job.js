const { Jobs} = require("../dbSchema/JobModel");

const job =
 {
  jobSearchByQuery :  async(args) => {
    // console.log("Reached here",args);
    var query={};
    if(args.searchby.length > 0) {
      query={$or: [{'title': {$regex: '.*' + args.searchby + '.*', $options:'i'}}, 
      {'createdby': {$regex: '.*' + args.searchby + '.*', $options:'i'} }
      ]};
    }
    try {
      let jobs = Jobs.find(query);
      return jobs;
    } catch(err) {
      return [];
    }
  },

  jobSearchByApplicantApplied : async(args) => {
    try {
      const query = {'studentsapplied.username' : args.username };
      const jobs = await Jobs.find(query);
      return jobs;
    } catch (err) {
      return [];
    }

  }

   
 }


module.exports = job;