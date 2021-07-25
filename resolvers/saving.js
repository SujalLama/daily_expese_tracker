module.exports = {
    Query: {
        allSavings: async (parent, args, {db, user}) => {
            try {
                const {Saving, Category} = db;
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                    Savings: []
                }

            const savings = await Saving.findAll({include: Category});
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
        },
        getSaving: async (parent, {id}, {db, user}) => {
             try {
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                    saving: {}
                }

            const saving = await db.Saving.findOne({where: {id}, include: [db.Category]});

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
        }
    },

    Mutation: {
        createSaving: async (parent, args, {db, user}) => {
            try {
                // checking authorization
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                    Saving: {}
                }

                const saving = await db.Saving.create(args)

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
        },
        updateSaving: async (parent, {id, amount, date, categoryId}, {db, user}) => {
            try {
                 // checking authorization
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                }

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
        },
        deleteSaving: async (parent, {id}, {db, user}) => {
            try {
                 // checking authorization
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                }

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
        }
    }
}