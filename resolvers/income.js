const {requiresAuth} = require("../permission");

module.exports = {
    Query: {
        allIncomes: requiresAuth.createResolver(async (parent, args, {db, user}) => {
            try {
                const {Income, Category, User} = db;
            const incomes = await Income.findAll({include: [Category, User]});
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
        }),
        getIncome: requiresAuth.createResolver(async (parent, {id}, {db, user}) => {
             try {
            const income = await db.Income.findOne({where: {id}, include: [db.Category, db.User]});

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
        })
    },

    Mutation: {
        createIncome: requiresAuth.createResolver(async (parent, args, {db, user}) => {
            try {
                const income = await db.Income.create({...args, creator: user.id})

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
        }),
        updateIncome: requiresAuth.createResolver(async (parent, {id, name, description, amount, date, categoryId}, {db, user}) => {
            try {
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
        }),
        deleteIncome: requiresAuth.createResolver(async (parent, {id}, {db, user}) => {
            try {
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
        })
    }
}