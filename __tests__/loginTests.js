import { login } from '../controllers/auth/index';
import AuthService from '../../service/auth/';
const authService = new AuthService();

describe('login controller tests', () => {
  it('should return status 200, token, user email and subscription', async () => {
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    const mRes = {};

    jest.spyOn(authService, 'getUser').mockImplementationOnce(() => user);
  });
});
