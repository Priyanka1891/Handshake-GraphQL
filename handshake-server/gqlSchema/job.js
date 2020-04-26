const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} = graphql;

const Job =  {
    StatusType :  new GraphQLObjectType ({
        name : 'Status',
        fields : () => ({
            username : {type: GraphQLString},
            applicationdate : {type: GraphQLString},
            status : {type: GraphQLString}
        })
    }),

    JobType : new GraphQLObjectType({
        name: 'Job',
        fields: () => ({
            title : {type: GraphQLString},
            createdate : {type: GraphQLString},
            enddate : {type: GraphQLString},
            location : {type: GraphQLString},
            salary :  {type: GraphQLString},
            description :  {type: GraphQLString},
            type :  {type: GraphQLString},
            createdby : {type: GraphQLString},
            username : {type: GraphQLString},
            // username/id of students applied
            studentsapplied : {
                type : new GraphQLList(StatusType),
                resolve(parent, args) {
                    parent.studentsapplied;
                }
            }   
        })
    })
}

module.exports = Job;