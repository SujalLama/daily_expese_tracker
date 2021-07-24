const {gql} = require('apollo-server-express');
module.exports = gql`
    type Category {
        id: Int
        title: String!,
    }

    type CategoriesResponseMessage {
        message: String!,
        success: Boolean!,
        categories: [Category],
    }

    type CategoryResponseMessage {
        message: String!,
        success: Boolean!,
        category: Category,
    }

    type CreateResponseMessage {
        message: String!,
        success: Boolean!,
        category: Category,
    }

    type ResponseMessage {
        message: String!,
        success: Boolean!,
    }

    type Query {
        allCategories: CategoriesResponseMessage!,
        getCategory(id: Int!): CategoryResponseMessage
    }

   type Mutation {
        createCategory(title: String!): CreateResponseMessage!,
        updateCategory(id: Int!, title: String!): ResponseMessage!,
        deleteCategory(id: Int!): ResponseMessage!,
    }
`