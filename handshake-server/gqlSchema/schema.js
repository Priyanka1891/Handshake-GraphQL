const graphql = require('graphql');
const {UserType} = require('./student');
const {EmployerType} = require('./employer')
const {JobType} = require('./job');

const {Users} = require('../dbSchema/UserModel');
const {Employers} = require ('../dbSchema/EmployerModel');
const {Jobs} = require('../dbSchema/JobModel');

const {studentlogin} = require('../mutations/student')
const {updateStudentDetails} = require('../mutations/student')



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

        jobs : {
            type : new GraphQLList(JobType),
            args : {createdby : {type: GraphQLString}},
            async resolve(parent, args) {
                let jobs = await Jobs.find({createdby: args.createdby});
                if (jobs) {
                    return jobs;
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
        // addCustomer: {
        //     type: StatusType,
        //     args: {
        //         name: { type: GraphQLString },
        //         email_id: { type: GraphQLString },
        //         password: { type: GraphQLString },
        //         address: { type: GraphQLString },
        //         phone_number: { type: GraphQLString }
        //     },
        //     async resolve(parent, args) {
        //         return customerSignup(args);
        //     }
        // },
        // addOwner: {
        //     type: StatusType,
        //     args: {
        //         name: { type: GraphQLString },
        //         email_id: { type: GraphQLString },
        //         password: { type: GraphQLString },
        //         address: { type: GraphQLString },
        //         phone_number: { type: GraphQLString },
        //         res_name: { type: GraphQLString },
        //         res_cuisine: { type: GraphQLString },
        //         res_zip_code: { type: GraphQLString }
        //     },
        //     async resolve(parent, args) {
        //         return ownerSignup(args);
        //     }
        // },
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
        // updateOwner: {
        //     type: StatusType,
        //     args: {
        //         name: { type: GraphQLString },
        //         email_id: { type: GraphQLString },
        //         password: { type: GraphQLString },
        //         address: { type: GraphQLString },
        //         phone_number: { type: GraphQLString },
        //         res_name: { type: GraphQLString },
        //         res_cuisine: { type: GraphQLString },
        //         res_zip_code: { type: GraphQLString }
        //     },
        //     resolve(parent, args) {
        //         return updateOwner(args);
        //     }
        // },
        // addMenuSection: {
        //     type: StatusType,
        //     args: {
        //         menu_section_name: { type: GraphQLString },
        //         user_id: { type: GraphQLString }
        //     },
        //     resolve(parent, args) {
        //         return addMenuSection(args);
        //     }
        // },
        // addMenuItem: {
        //     type: StatusType,
        //     args: {
        //         menu_section_name: { type: GraphQLString },
        //         user_id: { type: GraphQLString },
        //         item_name: { type: GraphQLString },
        //         item_description: { type: GraphQLString },
        //         item_price: { type: GraphQLString }
        //     },
        //     resolve(parent, args) {
        //         return addMenuItem(args);
        //     }
        // },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});