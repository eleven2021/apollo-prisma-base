import { QueryResolvers } from "../../../gqlTypes";

export const users: QueryResolvers["users"] = ({}, _args, context) =>
  context.prisma.user.findMany();
