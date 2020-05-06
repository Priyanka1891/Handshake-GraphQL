const { Users } = require("../dbSchema/UserModel");

const student =
 {
  studentSearchByQuery :  async(args) => {
    var query={};
    if(args.searchby.length > 0) {
      query={$or: [{'basicDetails.name': {$regex: '.*' + args.searchby + '.*', $options:'i'}}, 
      {'studentEducation.colgname': {$regex: '.*' + args.searchby + '.*', $options:'i'} }
      ]};
    }
    try {
      let students = Users.find(query);
      return students;
    } catch(err) {
      return [];
    }
  },
   
 }


module.exports = student;