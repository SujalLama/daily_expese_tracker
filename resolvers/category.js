const bcrypt = require('bcryptjs');

module.exports = {
    Query: {
        allCategories: async (parent, args, {db, user}) => {
            try {
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                    categories: []
                }

            const categories = await db.Category.findAll();

            return {
                categories,
                message: "All categories are fetched",
                success: true
            }
            } catch (error) {
                return {
                    message: error.message,
                    success: false
                    }
            }
        },
        getCategory: async (parent, {id}, {db, user}) => {
             try {
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                    category: {}
                }

            const category = await db.Category.findOne({where: {id}});

            if(!category) return {
                message: "Category doesn't exists.",
                success: false,
                category: {}
            }

            return {
                category,
                message: "Single category is fetched",
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
        createCategory: async (parent, {title}, {db, user}) => {
            try {
                // checking authorization
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                    category: {}
                }

                const category = await db.Category.create({title})

                return {
                    message: 'Category is created',
                    success: true,
                    category
                }

            } catch (error) {
                return {
                    message: error.message,
                    success: false,
                    category: ""
                    }
            }
        },
        updateCategory: async (parent, {id, title}, {db, user}) => {
            try {
                 // checking authorization
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                }

                const category = await db.Category.findOne({where: {id}})

                if(!category) return {
                    message: "Category doesn't exist.",
                    success: false,
                }

                await db.Category.update({title}, {where: {id}})

                return {
                    message: "Category is successfully updated.",
                    success: true,
                }

            } catch (error) {
                return {
                    message: error.message,
                    success: false,
                    }
            }
        },
        deleteCategory: async (parent, {id}, {db, user}) => {
            try {
                 // checking authorization
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                }

                const category = await db.Category.findOne({where: {id}})

                if(!category) return {
                    message: "Category doesn't exist.",
                    success: false,
                }

                await db.Category.destroy({where: {id}})

                return {
                    message: "Category is successfully deleted.",
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