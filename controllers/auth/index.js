import { HttpCode } from '../../lib/constants.js';
import AuthService from '../../service/auth/index.js';
const authService = new AuthService();

const registration = async (req, res, next) => {
    const { email } = req.body;
    const isUserExist = await authService.isUserExist(email);
    if (isUserExist) {
        return res.status(HttpCode.CONFLICT).json({
            status: 'error',
            code: HttpCode.CONFLICT,
            message: 'Email is already exist',
        });
    }
    const data = await authService.create(req.body);

    res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data,
    });
};
const login = async (req, res, next) => {
    res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {},
    });
};
const logout = async (req, res, next) => {
    res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {},
    });
};

export { registration, login, logout };
