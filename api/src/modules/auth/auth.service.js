import { save, getByEmail } from '../user/index.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import knexConfig from '../../config/database.js'

export const login = async (params) => {
  const user = await getByEmail(params.email);
  
  if(user) {
    const passwordCorrect = bcrypt.compareSync(params.password, user.password)
    if(!passwordCorrect) {
      return { error: 'Invalid email or password' }
    }
  } else {
    return { error: 'Invalid email or password' }
  }

  const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET);
  
    return { token };
}
export const register = async (params) => {
  const user = await getByEmail(params.email);

  if(user) {
    return { error: 'This email already exists'}
  }
  const userCreated = await save(params);
  const token = jwt.sign({ id: userCreated[0] }, process.env.JWT_SECRET);
  
  return { token };
}