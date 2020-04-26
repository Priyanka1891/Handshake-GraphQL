const graphql = require('graphql');
const {UserType} = require('./student');
const {EmployerType} = require('./employer')
const {JobType} = require('./job');

const {EventType} = require('./event');
const {Users} = require('../dbSchema/UserModel');
const {Employers} = require ('../dbSchema/EmployerModel');
const {Jobs} = require('../dbSchema/JobModel');
const {Events} = require('../dbSchema/EventModel');



const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
} = graphql;


const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
        status: { type: GraphQLString },
        message: { type: GraphQLString }
    })
});


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
        },

        events : {
            type : new GraphQLList(EventType),
            args : {createdby :  {type: GraphQLString}},
            async resolve(parent, args) {
                let events =  await Events.find({createdby: args.createdby});
                if (events) {
                    return events;
                }
            }
        }
        // menu: {
        //     type: new GraphQLList(MenuSectionType),
        //     args: { user_id: { type: GraphQLString } },
        //     async resolve(parent, args) {
        //         let user = await Users.findById(args.user_id);
        //         if (user) {
        //             let sections = user.restaurant.menu_sections;
        //             return sections;
        //         }
        //     }
        // },
        // restaurants: {
        //     type: new GraphQLList(RestaurantType),
        //     args: { input: { type: GraphQLString } },
        //     async resolve(parent, args) {
        //         let owners = await Users.find({ is_owner: true });
        //         let restaurants = owners.map(owner => owner.restaurant);
        //         return restaurants;
        //     }
        // },
        // menu_sections: {
        //     type: new GraphQLList(MenuSectionType),
        //     args: { user_id: { type: GraphQLString } },
        //     async resolve(parent, args) {
        //         let user = await Users.findById(args.user_id);
        //         return user.restaurant.menu_sections;
        //     }
        // }
    }
});

// const Mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addCustomer: {
//             type: StatusType,
//             args: {
//                 name: { type: GraphQLString },
//                 email_id: { type: GraphQLString },
//                 password: { type: GraphQLString },
//                 address: { type: GraphQLString },
//                 phone_number: { type: GraphQLString }
//             },
//             async resolve(parent, args) {
//                 return customerSignup(args);
//             }
//         },
//         addOwner: {
//             type: StatusType,
//             args: {
//                 name: { type: GraphQLString },
//                 email_id: { type: GraphQLString },
//                 password: { type: GraphQLString },
//                 address: { type: GraphQLString },
//                 phone_number: { type: GraphQLString },
//                 res_name: { type: GraphQLString },
//                 res_cuisine: { type: GraphQLString },
//                 res_zip_code: { type: GraphQLString }
//             },
//             async resolve(parent, args) {
//                 return ownerSignup(args);
//             }
//         },
//         updateCustomer: {
//             type: StatusType,
//             args: {
//                 name: { type: GraphQLString },
//                 email_id: { type: GraphQLString },
//                 password: { type: GraphQLString },
//                 address: { type: GraphQLString },
//                 phone_number: { type: GraphQLString }
//             },
//             resolve(parent, args) {
//                 return updateCustomer(args);
//             }
//         },
//         updateOwner: {
//             type: StatusType,
//             args: {
//                 name: { type: GraphQLString },
//                 email_id: { type: GraphQLString },
//                 password: { type: GraphQLString },
//                 address: { type: GraphQLString },
//                 phone_number: { type: GraphQLString },
//                 res_name: { type: GraphQLString },
//                 res_cuisine: { type: GraphQLString },
//                 res_zip_code: { type: GraphQLString }
//             },
//             resolve(parent, args) {
//                 return updateOwner(args);
//             }
//         },
//         addMenuSection: {
//             type: StatusType,
//             args: {
//                 menu_section_name: { type: GraphQLString },
//                 user_id: { type: GraphQLString }
//             },
//             resolve(parent, args) {
//                 return addMenuSection(args);
//             }
//         },
//         addMenuItem: {
//             type: StatusType,
//             args: {
//                 menu_section_name: { type: GraphQLString },
//                 user_id: { type: GraphQLString },
//                 item_name: { type: GraphQLString },
//                 item_description: { type: GraphQLString },
//                 item_price: { type: GraphQLString }
//             },
//             resolve(parent, args) {
//                 return addMenuItem(args);
//             }
//         },
//         login: {
//             type: StatusType,
//             args: {
//                 email_id: { type: GraphQLString },
//                 password: { type: GraphQLString },
//             },
//             resolve(parent, args) {
//                 return login(args);
//             }
//         },
//     }
// });
var Mutation;

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});