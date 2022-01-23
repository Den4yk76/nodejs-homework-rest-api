import jwt from 'jsonwebtoken';
import Users from '../../repository/users';
const SECRET_KEY = process.env.JWT_SECRET_KEY;
class AuthService {
    async isUserExist(email) {
        const user = await Users.findByEmail(email);
        return !!user;
    }

    async isUserWithToken(verificationToken) {
        const user = await Users.findByToken(verificationToken);
        return user;
    }

    async create(body) {
        const { email, subscription, avatarUrl, verificationToken } =
            await Users.create(body);
        return { email, subscription, avatarUrl, verificationToken };
    }

    async getUser(email, password) {
        const user = await Users.findByEmail(email);
        const isValidPassword = await user?.isValidPassword(password);
        if (!isValidPassword || !user?.verify) {
            return null;
        }
        return user;
    }

    async findByEmail(email) {
        const user = await Users.findByEmail(email);
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

    async verify(userId) {
        await Users.verify(userId);
    }
}

export default AuthService;
