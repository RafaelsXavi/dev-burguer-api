import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import User from '../models/User.js';

class UserService {
  async create({ name, email, password, admin }) {
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      const error = new Error('User already exists.');
      error.status = 400;
      throw error;
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    });

    return user;
  }
}

export default new UserService();
