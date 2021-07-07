module.exports = {
    Query: {
        allUsers: (parent, args, {db}) => db.User.findAll(),
        getUser: (parent, {id}, {db}) => db.User.findOne({where: {id}})
    },
    Mutation: {
        postUser: (parent, args, {db}) => db.User.create(args),
    }
}