import { ApolloServer } from 'apollo-server';

import { crawledDataResolversInstance } from "./index.js";
import crawledDataSchema from "./infra/graph-ql/crawled-data/crawled-data.schema.js";

const server = new ApolloServer({
  typeDefs: crawledDataSchema,
  resolvers: {
    Query: crawledDataResolversInstance.Query,
    Mutation: crawledDataResolversInstance.Mutation,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server listening at ${url}`);
});
