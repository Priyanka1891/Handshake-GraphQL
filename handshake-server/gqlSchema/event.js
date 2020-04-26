const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} = graphql;

const Event = {
    EventType : new GraphQLObjectType({
        name: 'Event',
        fields: () => ({
            title : {type: GraphQLString},
            date : {type: GraphQLString},
            detail : {type: GraphQLString},
            location : {type: GraphQLString},
            createdby : {type: GraphQLString},
            eligibility : {type: GraphQLString},
            // username of students applied
            studentsregistered : {
                type : new GraphQLList(GraphQLString),
                resolve(parent, args) {
                    return parent.studentsregistered;
                }
            }
        })
    })
}

module.exports = Event;