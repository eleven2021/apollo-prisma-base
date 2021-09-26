import { MutationResolvers } from "../../../gqlTypes";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
const secret:string = (process.env.SECRET as string);
async function encodePassword(password: string){
   return  await bcrypt.hashSync(password, 3)
}


export const createUser: MutationResolvers["createUser"] = async (
  {},
  { input: { name, email, password } },
  context
  ) => {
    password = await encodePassword(password);
    const newUser = await context.prisma.user.create({ data: { name, email, password } });
    return {token:  jwt.sign( {user_id: newUser.id,user_email: newUser.email  }, secret) ,user: newUser }
};

export const login: MutationResolvers["login"] = async (
  {},
  { input: { email, password } },
  context
  ) => {
    const [ signInUser ]  = await context.prisma.user.findMany({ where: { email } })
    if (!signInUser) throw new Error('Unable to Login');
    const isMatch = bcrypt.compareSync(password, signInUser.password);
    if (!isMatch) throw new Error('Unable to Login');
    return {token:  jwt.sign({user_id: signInUser.id,user_email: signInUser.email }, secret),user: signInUser };
};

