const graphql = require('graphql');
const {UserType} = require('./student');
const {EmployerType} = require('./employer')
const {JobType} = require('./job');

const {Users} = require('../dbSchema/UserModel');
const {Employers} = require ('../dbSchema/EmployerModel');
const {Jobs} = require('../dbSchema/JobModel');

const {studentlogin, studentsignup, updateStudentDetails, updateStudentEducationDetails,
       updateStudentExperienceDetails} = require('../mutations/student');
const {studentSearchByQuery} = require('../queries/student')

const {jobSearchByQuery, jobSearchByApplicantApplied}  =  require('../queries/job');
const {applyJob,postJob, updateApplicationStatus} = require('../mutations/job');

const {employerlogin,employersignup,updateEmployerDetails} = require('../mutations/employer');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
} = graphql;


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        student : {
            type: UserType,
            args: { username: { type: GraphQLString } },
            async resolve(parent, args) {
                let user = await Users.findOne({username: args.username});
                if (user) {
                    return user;
                }
            }
        },
        employer : {
            type: EmployerType,
            args: { username: { type: GraphQLString } },
            async resolve(parent, args) {
                let user = await Employers.findOne({username : args.username});
                if (user) {
                    return user;
                }
            }
        },
        jobsearch : {
            type : new GraphQLList(JobType),
            args : {searchby : {type: GraphQLString}},
            async resolve(parent, args) {
                return jobSearchByQuery(args);
            }
        },
        jobsapplied : {
            type : new GraphQLList(JobType),
            args : {username : {type: GraphQLString}},
            async resolve(parent, args) {
                return jobSearchByApplicantApplied(args);
            }
        },
        studentsearch : {
            type : new GraphQLList(UserType),
            args : {searchby : {type : GraphQLString}},
            async resolve(parent, args) {
                return studentSearchByQuery(args);
            }
        },
        jobDetailsByID : {
            type : JobType,
            args : {id : {type : GraphQLString} },
            async resolve(parent, args) {
                let job = await Jobs.findById(args.id);
                if (job) {
                    return job;
                }
            }
        }
    }
});


const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
        status: { type: GraphQLString },
        message: { type: GraphQLString }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        studentsignup : {
          type: StatusType,
          args: {
            username: { type: GraphQLString},
            password:  { type: GraphQLString},
            email: {type: GraphQLString},
            colgname: { type: GraphQLString}
          },
          resolve(parent, args) {
              return studentsignup(args);
          }
        },
        studentlogin: {
            type: StatusType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                return studentlogin(args);
            }
        },
        updateStudentDetails: {
            type: StatusType,
            args: {
                username : {type : GraphQLString},
                email : {type :GraphQLString},
                name : {type : GraphQLString},
                contactno : {type : GraphQLString},
                dob : {type : GraphQLString},
                city : {type : GraphQLString},
                state : {type :  GraphQLString},
                country : {type : GraphQLString},
                objective : {type : GraphQLString},
                skills : {type : GraphQLString}
            },
            resolve(parent, args) {
                return updateStudentDetails(args);
            }
        },
        updateStudentEducationDetails: {
            type: StatusType,
            args: {
                username : {type : GraphQLString},
                colgname : {type :GraphQLString},
                location : {type : GraphQLString},
                degree : {type : GraphQLString},
                major : {type : GraphQLString},
                yearofpassing : {type : GraphQLString},
                cgpa : {type :  GraphQLString}
            },
            resolve(parent, args) {
                return updateStudentEducationDetails(args);
            }
        }, 
        updateStudentExperienceDetails: {
            type: StatusType,
            args: {
                username : {type : GraphQLString},
                companyname : {type :GraphQLString},
                companylocation : {type : GraphQLString},
                title : {type : GraphQLString},
                startdate : {type : GraphQLString},
                enddate : {type : GraphQLString},
                jobdetails : {type :  GraphQLString}
            },
            resolve(parent, args) {
                return updateStudentExperienceDetails(args);
            }
        },
        applyJob : {
            type: StatusType,
            args : {
                username : {type: GraphQLString},
                jobid : {type: GraphQLString}
            },
            resolve(parent, args) {
                return applyJob(args);
            }
        },
        postJob : {
          type: StatusType,
          args: {
            title : { type: GraphQLString},
            createdate :  { type: GraphQLString},
            enddate : {type: GraphQLString},
            location : { type: GraphQLString},
            salary : { type: GraphQLString},
            description :  { type: GraphQLString},
            type : {type: GraphQLString},
            createdby : { type: GraphQLString},
            username : { type : GraphQLString}
          },
          resolve(parent, args) {
              return postJob(args);
          }
        },
        employerlogin: {
          type: StatusType,
          args: {
              username: { type: GraphQLString },
              password: { type: GraphQLString },
          },
          resolve(parent, args) {
              return employerlogin(args);
          }
        },
        employersignup: {
          type: StatusType,
          args: {
            username: { type: GraphQLString},
            password:  { type: GraphQLString},
            email: {type: GraphQLString},
            location: { type: GraphQLString}
          },
          resolve(parent, args) {
              return employersignup(args);
          }
        },
        updateEmployerDetails: {
          type: StatusType,
          args: {
              username : {type : GraphQLString},
              name : {type : GraphQLString},
              location : {type : GraphQLString},
              contactno : {type : GraphQLString},
              description : {type : GraphQLString},
          },
        resolve(parent, args) {
            return updateEmployerDetails(args);
        }
      },
      updateApplicationStatus : {
        type : StatusType,
        args : {
          jobid : {type: GraphQLString},
          username: {type: GraphQLString},
          status : {type: GraphQLString}
        },
        resolve(parent, args) {
          return updateApplicationStatus(args);
        }
      }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});