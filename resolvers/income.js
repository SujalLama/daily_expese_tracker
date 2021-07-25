module.exports = {
    Query: {
        allIncomes: async (parent, args, {db, user}) => {
            try {
                const {Income, Category} = db;
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                    Incomes: []
                }

            const incomes = await Income.findAll({include: Category});
            return {
                incomes,
                message: "All Incomes are fetched",
                success: true
            }
            } catch (error) {
                return {
                    message: error.message,
                    success: false
                    }
            }
        },
        getIncome: async (parent, {id}, {db, user}) => {
             try {
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                    Income: {}
                }

            const income = await db.Income.findOne({where: {id}, include: [db.Category]});

            if(!income) return {
                message: "Income doesn't exists.",
                success: false,
                income: {}
            }

            return {
                income,
                message: "Single Income is fetched",
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
        createIncome: async (parent, args, {db, user}) => {
            try {
                // checking authorization
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                    income: {}
                }

                const income = await db.Income.create(args)

                return {
                    message: 'Income is created',
                    success: true,
                    income
                }

            } catch (error) {
                return {
                    message: error.message,
                    success: false,
                    income: {}
                    }
            }
        },
        updateIncome: async (parent, {id, name, description, amount, date, categoryId}, {db, user}) => {
            try {
                 // checking authorization
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                }

                const income = await db.Income.findOne({where: {id}})

                if(!income) return {
                    message: "Income doesn't exist.",
                    success: false,
                }

                await db.Income.update({name, description, amount, date, categoryId}, {where: {id}})

                return {
                    message: "Income is successfully updated.",
                    success: true,
                }

            } catch (error) {
                return {
                    message: error.message,
                    success: false,
                    }
            }
        },
        deleteIncome: async (parent, {id}, {db, user}) => {
            try {
                 // checking authorization
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                }

                const income = await db.Income.findOne({where: {id}})

                if(!income) return {
                    message: "Income doesn't exist.",
                    success: false,
                }

                await db.Income.destroy({where: {id}})

                return {
                    message: "Income is successfully deleted.",
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