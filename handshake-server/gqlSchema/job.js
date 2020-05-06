const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} = graphql;

const JobStatusType =  new GraphQLObjectType ({
    name : 'JobStatus',
    fields : () => ({
        username : {type: GraphQLString},
        applicationdate : {type: GraphQLString},
        status : {type: GraphQLString}
    })
});

const Job =  {
    JobType : new GraphQLObjectType({
        name: 'Job',
        fields: () => ({
            _id : {type : GraphQLString},
            title : {type: GraphQLString},
            createdate : {type: GraphQLString},
            enddate : {type: GraphQLString},
            location : {type: GraphQLString},
            salary :  {type: GraphQLString},
            description :  {type: GraphQLString},
            type :  {type: GraphQLString},
            createdby : {type: GraphQLString},
            username : {type: GraphQLString},
            studentsapplied : {
                type : new GraphQLList(JobStatusType),
                resolve(parent, args) {
                    return parent.studentsapplied;
                }
            }
        })
    })
}

module.exports = Job;