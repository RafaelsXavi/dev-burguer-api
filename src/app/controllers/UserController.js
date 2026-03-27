import UserService from '../services/UserService.js';

class UserController {
  async store(request, response) {
    const { name, email, password, admin } = request.body;

    const user = await UserService.create({
      name,
      email,
      password,
      admin,
    });

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  }
}

export default new UserController();
