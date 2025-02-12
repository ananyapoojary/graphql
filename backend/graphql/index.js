const { GraphQLSchema } = require("graphql");
const { RootQuery, Mutation } = require("../schema/userSchema");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
