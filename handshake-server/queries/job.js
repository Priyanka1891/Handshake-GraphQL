const { Jobs} = require("../dbSchema/JobModel");

const job =
 {
  jobSearchByQuery :  async(args) => {
    var query={};
    if(args.searchby.length > 0) {
      query={$or: [{'title': {$regex: '.*' + args.searchby + '.*', $options:'i'}}, 
      {'createdby': {$regex: '.*' + args.searchby + '.*', $options:'i'} }
      ]};
    }
    let jobs = Jobs.find(query);
    return jobs;
  }
   
 }


module.exports = job;