import { QueryResolvers } from "../../../gqlTypes";

export const users: QueryResolvers["users"] = async (
    {},
    _args,
    context,
    {}
   ) => {
      return await context.prisma.user.findMany()
   }



export const me: QueryResolvers["me"] = async ( {}, _args, context, {}) =>  {
    const user_email = context.user.user_email;
    return await context.prisma.user.findUnique({ where:  { email: user_email }});
}
