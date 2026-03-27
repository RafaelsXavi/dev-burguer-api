import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';
import User from '../models/User.js';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid email or password',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        admin: user.admin,
        name: user.name,
      },
      process.env.JWT_SECRET || authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      },
    );

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      token,
    });
  }
}

export default new SessionController();
