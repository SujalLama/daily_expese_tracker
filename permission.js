const createResolver = (resolver) => {
  const baseResolver = resolver;
  baseResolver.createResolver = (childResolver) => {
    const newResolver = async (parent, args, context, info) => {
      await resolver(parent, args, context, info);
      return childResolver(parent, args, context, info);
    };
    return createResolver(newResolver);
  };
  return baseResolver;
};

// requiresAuth
const requiresAuth = createResolver((parent, args, { user }) => {
  if (!user || !user.id) {
    throw new Error('Not authenticated');
  }
});

const requiresAdmin = requiresAuth.createResolver((parent, args, context) => {
    console.log(context.user.isAdmin);
    if(!context.user.isAdmin) {
        throw new Error('Requires access of admin');
    }
})

module.exports = {requiresAuth, requiresAdmin};