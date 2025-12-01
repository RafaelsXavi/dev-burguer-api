import { request } from 'express';
import * as Yup from 'yup';
import User from '../models/User.js';
import bcrypt from 'bcrypt';


class SessionController {
  async store(req, res) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    const isValide = await schema.isValid(request.body, {
      abortEarly: false,
      strict: true,
    });

    const emailOurPasswordIncorrect = () => {
      return res
        .status(400)
        .json({ error: "Validation fails" });
    }

    if (!isValide) { emailOurPasswordIncorrect(); }

    const { email, password } = req.body;


    const existingUser = await User.findOne({
      where: { email }
    });

    if (!existingUser) { emailOurPasswordIncorrect();}


    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password_hash
    );

    if (!isPasswordValid) {emailOurPasswordIncorrect(); }


    return res.status(200).json({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      admin: existingUser.admin,
    });

  }
}

export default new SessionController;
