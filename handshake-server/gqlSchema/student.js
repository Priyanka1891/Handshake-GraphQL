const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} = graphql;

const BasicDetailsType = new GraphQLObjectType({
    name : 'Basic_Details',
    fields : () => ({
        name : {type: GraphQLString},
        dob : {type: GraphQLString},
        city : {type: GraphQLString},
        state : {type: GraphQLString},
        country : {type: GraphQLString},
        contactno : {type: GraphQLString},
        objective : {type: GraphQLString},
        skills : {type: GraphQLString}
    })
})

const EducationType  = new GraphQLObjectType({
    name : 'Education',
    fields : () => ({
        colgname : {type: GraphQLString},
        location : {type: GraphQLString},
        degree : {type: GraphQLString},
        major : {type: GraphQLString},
        yearofpassing : {type: GraphQLString},
        cgpa : {type: GraphQLString}
    })    
})

const ExperienceType = new GraphQLObjectType({
    name : 'Experience',
    fields : () => ({
        companyname : {type: GraphQLString},
        companylocation : {type: GraphQLString},
        title : {type: GraphQLString},
        startdate : {type: GraphQLString},
        enddate : {type: GraphQLString},
        jobdetails : {type: GraphQLString}
    })
})

const StudentDetail = {
    UserType : new GraphQLObjectType({
        name: 'User',
        fields: () => ({
            username: { type: GraphQLString },
            email_id: { type: GraphQLString },
            password: { type: GraphQLString },
            basicDetails : { type : BasicDetailsType},
            studentEducation : {
                type : new GraphQLList(EducationType),
                resolve(parent, args) {
                    return parent.studentEducation;
                }
            },
            studentExperience : {
                type : new GraphQLList(ExperienceType),
                resolve(parent, args) {
                    return parent.studentExperience;
                }
            }

        })
    })
}
module.exports = StudentDetail;