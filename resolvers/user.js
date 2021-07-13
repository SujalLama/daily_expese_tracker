const bcrypt = require('bcryptjs');

module.exports = {
    Query: {
        allUsers: (parent, args, {db}) => db.User.findAll(),
        getUser: (parent, {id}, {db}) => db.User.findOne({where: {id}})
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