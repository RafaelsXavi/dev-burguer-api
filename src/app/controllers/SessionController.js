import * as Yup from 'yup';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';
class SessionController {
  async store(req, res) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    const isValide = await schema.isValid(req.body, {
      abortEarly: false,
      strict: true,
    });

    const emailOurPasswordIncorrect = () => {
      return res
        .status(400)
        .json({ error: "Validation fails" });
    }

    if (!isValide) { return emailOurPasswordIncorrect(); }

    const { email, password } = req.body;


    const existingUser = await User.findOne({
      where: { email }
    });

    if (!existingUser) { return emailOurPasswordIncorrect();}


    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password_hash
    );

    if (!isPasswordValid) {return emailOurPasswordIncorrect(); }

const token = jwt.sign(
  { 
   id: existingUser.id,
   admin: existingUser.admin,
   name: existingUser.name,
   }, 

   authConfig.secret,

  { 
    expiresIn: authConfig.expiresIn },)

    return res.status(200).json({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      admin: existingUser.admin,
      token,
    });

  }
}

export default new SessionController;
