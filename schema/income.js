const {gql} = require('apollo-server-express');

module.exports = gql`
    type Income {
        id: Int
        name: String!,
        description: String,
        amount: Float!,
        date: String!,
        categoryId: Int!,
        category: Category!
    }

    type IncomesResponseMessage {
        message: String!,
        success: Boolean!,
        incomes: [Income],
    }

    type IncomeResponseMessage {
        message: String!,
        success: Boolean!,
        income: Income,
    }

    type CreateResponseMessage {
        message: String!,
        success: Boolean!,
        income: Income,
    }

    type ResponseMessage {
        message: String!,
        success: Boolean!,
    }

    type Query {
        allIncomes: IncomesResponseMessage!,
        getIncome(id: Int!): IncomeResponseMessage
    }

   type Mutation {
        createIncome(name: String!, description: String, amount: Float!, date: String!, categoryId: Int! ): CreateResponseMessage!,
        updateIncome(id: Int!, name: String, description: String, amount: Float, date: String, categoryId: Int ): ResponseMessage!,
        deleteIncome(id: Int!): ResponseMessage!,
    }
`