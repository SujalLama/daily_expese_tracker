const {gql} = require('apollo-server-express');

module.exports = gql`
    type Saving {
        id: Int
        amount: Float!,
        date: String!,
        categoryId: Int!,
        category: Category!
    }

    type SavingsResponseMessage {
        message: String!,
        success: Boolean!,
        savings: [Saving],
    }

    type SavingResponseMessage {
        message: String!,
        success: Boolean!,
        saving: Saving,
    }

    type CreateResponseMessage {
        message: String!,
        success: Boolean!,
        saving: Saving,
    }

    type ResponseMessage {
        message: String!,
        success: Boolean!,
    }

    type Query {
        allSavings: SavingsResponseMessage!,
        getSaving(id: Int!): SavingResponseMessage
    }

   type Mutation {
        createSaving( amount: Float!, date: String!, categoryId: Int! ): CreateResponseMessage!,
        updateSaving(id: Int!, amount: Float, date: String, categoryId: Int ): ResponseMessage!,
        deleteSaving(id: Int!): ResponseMessage!,
    }
`