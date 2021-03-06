const {requiresAuth} = require("../permission");

module.exports = {
    Query: {
        allSavings: requiresAuth.createResolver(async (parent, args, {db, user}) => {
            try {
                const {Saving, Category, User} = db;
            const savings = await Saving.findAll({include: [Category]});
            return {
                savings,
                message: "All Savings are fetched",
                success: true
            }
            } catch (error) {
                return {
                    message: error.message,
                    success: false
                    }
            }
        }),
        getSaving: requiresAuth.createResolver(async (parent, {id}, {db, user}) => {
             try {
            const saving = await db.Saving.findOne({where: {id}, include: [db.Category, db.User]});

            if(!saving) return {
                message: "Saving doesn't exists.",
                success: false,
            }

            return {
                saving,
                message: "Single Saving is fetched",
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
        createSaving: requiresAuth.createResolver(async (parent, args, {db, user}) => {
            try {
                const saving = await db.Saving.create({...args, creator: user.id})

                return {
                    message: 'Saving is created',
                    success: true,
                    saving
                }

            } catch (error) {
                return {
                    message: error.message,
                    success: false,
                    Saving: {}
                    }
            }
        }),
        updateSaving: requiresAuth.createResolver(async (parent, {id, amount, date, categoryId}, {db, user}) => {
            try {
                const saving = await db.Saving.findOne({where: {id}})

                if(!saving) return {
                    message: "Saving doesn't exist.",
                    success: false,
                }

                await db.Saving.update({amount, date, categoryId}, {where: {id}})

                return {
                    message: "Saving is successfully updated.",
                    success: true,
                }

            } catch (error) {
                return {
                    message: error.message,
                    success: false,
                    }
            }
        }),
        deleteSaving: requiresAuth.createResolver(async (parent, {id}, {db, user}) => {
            try {

                const saving = await db.Saving.findOne({where: {id}})

                if(!saving) return {
                    message: "Saving doesn't exist.",
                    success: false,
                }

                await db.Saving.destroy({where: {id}})

                return {
                    message: "Saving is successfully deleted.",
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