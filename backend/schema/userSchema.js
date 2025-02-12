const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require("graphql");
const User = require("../models/User");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(_, { name, email, password }) {
        const user = new User({ name, email, password });
        return await user.save();
      },
    },
  },
});

module.exports = { RootQuery, Mutation };
