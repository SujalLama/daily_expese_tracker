const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// const typeDefs = require('./schema/hi');
// const resolvers = require('./resolvers/hi');
require('dotenv').config();
const path = require('path');
const db = require('./models')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));
const cors = require('cors');
const jwt = require('jsonwebtoken');


async function getUser (token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    return decoded;
  } catch (error) {
    return null
  }
}

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.split(' ')[1];
      const user = await getUser(token)
  
      return {user, db}
    }
  })

  await server.start();
  app.use(cors('*'));
  server.applyMiddleware({ app });

  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

  await new Promise(resolve => app.listen({ port: process.env.PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT + '' + server.graphqlPath}`);
  return { server, app };
}

startApolloServer();