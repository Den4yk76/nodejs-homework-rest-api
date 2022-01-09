import jwt from 'jsonwebtoken';
import Jimp from 'jimp';
import { v4 as uuidv4 } from 'uuid';
import Users from '../../repository/users';
const SECRET_KEY = process.env.JWT_SECRET_KEY;
class AuthService {
  async isUserExist(email) {
    const user = await Users.findByEmail(email);
    return !!user;
  }

  async create(body) {
    const { email, subscription } = await Users.create(body);
    return { email, subscription };
  }

  async getUser(email, password) {
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  getToken(user) {
    const { id, email } = user;
    const payload = { id, email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '8h' });
    return token;
  }

  async setToken(id, token) {
    await Users.updateToken(id, token);
  }

  async setSubscription(id, subscription) {
    await Users.setSubscription(id, subscription);
  }

  async updateAvatar(userId, file) {
    const imgPath = `/avatars/${uuidv4()}.jpg`;
    Jimp.read(file.path, (err, file) => {
      file.resize(256, 256).write(`./public${imgPath}`);
    });
    await Users.updateAvatar(userId, imgPath);
    return imgPath;
  }
}

export default AuthService;
