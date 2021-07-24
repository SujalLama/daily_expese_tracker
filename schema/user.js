const {gql} = require('apollo-server-express');
module.exports = gql`
    type User {
        id: Int
        username: String,
        email: String!,
    }

    type UsersResponseMessage {
        message: String!,
        success: Boolean!,
        users: [User],
    }

    type UserResponseMessage {
        message: String!,
        success: Boolean!,
        user: User,
    }

    type ResponseMessage {
        message: String!,
        success: Boolean!,
        token: String
    }

    type Query {
        allUsers: UsersResponseMessage!,
        getUser(id: Int!): UserResponseMessage
    }

   type Mutation {
        registerUser(username: String!, email: String!, password: String!): ResponseMessage!,
        loginUser(email: String!, password: String!): ResponseMessage!
    }
`