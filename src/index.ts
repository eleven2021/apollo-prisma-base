import { ApolloServer, gql  } from "apollo-server";
import {  IResolvers } from '@graphql-tools/utils';
import { Resolvers } from "../gqlTypes";
import { readFileSync } from "fs";
import { createContext } from "./context";
import { resolvers } from "./resolvers";
import { PrismaClient } from "@prisma/client";
const port = process.env.PORT;
const prisma = new PrismaClient();

const getTypeDefs = () => {
  const schemaStr = readFileSync("schema.gql", "utf8");
  return gql`
    ${schemaStr}
  `;
};

//resolvers:  resolvers as IResolvers<any, any> & Resolvers,
async function startApolloServer(){
    const server = new ApolloServer({
      typeDefs: getTypeDefs(),
      resolvers:  resolvers as IResolvers,
      debug: true,
      context: ({ req }) => createContext(req)
    })
    // await server.start()
    const { url } = await server.listen();
    console.log(`🚀 Server ready at ${url}`);
}

startApolloServer();
