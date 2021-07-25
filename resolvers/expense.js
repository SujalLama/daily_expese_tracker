module.exports = {
    Query: {
        allExpenses: async (parent, args, {db, user}) => {
            try {
                const {Expense, Category, User} = db;
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                    expenses: []
                }

            const expenses = await Expense.findAll({include: Category, User});
            return {
                expenses,
                message: "All expenses are fetched",
                success: true
            }
            } catch (error) {
                return {
                    message: error.message,
                    success: false
                    }
            }
        },
        getExpense: async (parent, {id}, {db, user}) => {
             try {
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                    expense: {}
                }

            const expense = await db.Expense.findOne({where: {id}, include: [db.Category, db.User]});

            if(!expense) return {
                message: "Expense doesn't exists.",
                success: false,
                expense: {}
            }

            return {
                expense,
                message: "Single Expense is fetched",
                success: true
            }
            } catch (error) {
                return {
                    message: error.message,
                    success: false
                    }
            }
        }
    },

    Mutation: {
        createExpense: async (parent, args, {db, user}) => {
            try {
                // checking authorization
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                    Expense: {}
                }

                const expense = await db.Expense.create({...args, creator: user})

                return {
                    message: 'Expense is created',
                    success: true,
                    expense
                }

            } catch (error) {
                return {
                    message: error.message,
                    success: false,
                    expense: {}
                    }
            }
        },
        updateExpense: async (parent, {id, name, description, amount, date, categoryId}, {db, user}) => {
            try {
                 // checking authorization
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                }

                const expense = await db.Expense.findOne({where: {id}})

                if(!expense) return {
                    message: "Expense doesn't exist.",
                    success: false,
                }

                await db.Expense.update({name, description, amount, date, categoryId}, {where: {id}})

                return {
                    message: "expense is successfully updated.",
                    success: true,
                }

            } catch (error) {
                return {
                    message: error.message,
                    success: false,
                    }
            }
        },
        deleteExpense: async (parent, {id}, {db, user}) => {
            try {
                 // checking authorization
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                }

                const expense = await db.Expense.findOne({where: {id}})

                if(!expense) return {
                    message: "Expense doesn't exist.",
                    success: false,
                }

                await db.Expense.destroy({where: {id}})

                return {
                    message: "Expense is successfully deleted.",
                    success: true,
                }

            } catch (error) {
                return {
                    message: error.message,
                    success: false,
                    }
            }
        }
    }
}