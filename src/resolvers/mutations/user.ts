import { MutationResolvers } from "../../../gqlTypes";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'

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
    return {token:  jwt.sign( {id: newUser.id,name: newUser.name, password: 'xxxxx' }, "supersecret") ,user: newUser }
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
    return {token:  jwt.sign({id: signInUser.id,name: signInUser.name, password: 'xxxxx' }, "supersecret"), user: signInUser };
};

