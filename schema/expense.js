const {gql} = require('apollo-server-express');

module.exports = gql`
    type Expense {
        id: Int
        name: String!,
        description: String,
        amount: Float!,
        date: String!,
        creator: Int!,
        owner: User,
        categoryId: Int!,
        category: Category!
    }

    type ExpensesResponseMessage {
        message: String!,
        success: Boolean!,
        expenses: [Expense],
    }

    type ExpenseResponseMessage {
        message: String!,
        success: Boolean!,
        expense: Expense,
    }

    type CreateResponseMessage {
        message: String!,
        success: Boolean!,
        expense: Expense,
    }

    type ResponseMessage {
        message: String!,
        success: Boolean!,
    }

    type Query {
        allExpenses: ExpensesResponseMessage!,
        getExpense(id: Int!): ExpenseResponseMessage
    }

   type Mutation {
        createExpense(name: String!, description: String, amount: Float!, date: String!, categoryId: Int! ): CreateResponseMessage!,
        updateExpense(id: Int!, name: String, description: String, amount: Float, date: String, categoryId: Int ): ResponseMessage!,
        deleteExpense(id: Int!): ResponseMessage!,
    }
`