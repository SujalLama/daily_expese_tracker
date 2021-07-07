const {gql} = require('apollo-server-express');
module.exports = gql`
    type User {
        id: Int
        username: String,
        email: String!,
    }
    type Query {
        allUsers: [User!]!,
        getUser(id: Int!): User!
    }
   type Mutation {
        postUser(username: String!, email: String!, password: String!): User!
    }
`