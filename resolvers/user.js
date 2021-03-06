const bcrypt = require('bcryptjs');

module.exports = {
    Query: {
        allUsers: async (parent, args, {db, user}) => {
            try {
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                    users: []
                }

            const users = await db.User.findAll();

            return {
                users,
                message: "All users are fetched",
                success: true
            }
            } catch (error) {
                return {
                    message: error.message,
                    success: false
                    }
            }
        },
        getUser: async (parent, {id}, {db, user}) => {
             try {
                if(!user) return {
                    message: "You are not allowed.",
                    success: false,
                    user: {}
                }

            const fetchedUser = await db.User.findOne({where: {id}});

            if(!fetchedUser) return {
                 message: "User doesn't exists.",
                    success: false,
                    user: {}
            }

            return {
                user: fetchedUser,
                message: "Single user is fetched",
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
        registerUser: async (parent, args, {db}) => {
            try {
                const user = await db.User.create(args)
                const token = user.generateToken()
                return {
                    message: 'User is created',
                    success: true,
                    token
                }

            } catch (error) {
                return {
                    message: error.message,
                    success: false,
                    token: ""
                    }
            }
        },
        loginUser: async (parent, {email, password}, {db}) => {
            try {

                if((!email || !password)) return {
                    message: "Empty password or username",
                    success: false,
                    token: ""
                }
                const user = await db.User.findOne({where: {email}})
                if(!user) return {
                    message: "user donesn't exist.",
                    success: false,
                    token: ""
                }

                if(!bcrypt.compareSync(password, user.password)) {
                    return {
                        message: "Invalid credentials",
                        success: false,
                        token: ""
                    }
                }

                const token = user.generateToken()
                    return {
                        message: "successfully signed in",
                        success: true,
                        token 
                    }

            } catch (error) {
                return {
                    message: error.message,
                    success: false,
                    token: ""
                    }
            }
        }
    }
}