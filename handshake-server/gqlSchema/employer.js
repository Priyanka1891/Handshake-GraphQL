const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString
} = graphql;

const EmployerDetail = {
    EmployerType : new GraphQLObjectType({
        name: 'Employer',
        fields: () => ({
            username: {type: GraphQLString},
            email : {type: GraphQLString},
            password: {type: GraphQLString},
            location : {type: GraphQLString},
            name :  {type: GraphQLString},
            description :  {type: GraphQLString},
            contactno :  {type: GraphQLString}
        })
    })
}

module.exports = EmployerDetail;