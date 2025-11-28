import { request } from 'express';
import * as Yup from 'yup';
import User from '../models/User.js';


class SessionController {
  async store(req, res) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    const isValide = await schema.isValid(request.body, { strict: true });

    if (!isValide) {
      return res
      .status(400)
      .json({ error: "Validation fails" });
    }

    const { email, password } = req.body;


    const existingUser = await User.findOne({
      where: { email }
    });

    if (!existingUser) {
      return res
      .status(400)
      .json({ error: "Validation fails" });
    }


    
    return res.status(200).json({ ok: true });

  }
}

export default SessionController;
