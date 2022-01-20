import { HttpCode } from '../../lib/constants.js';
import AuthService from '../../service/auth/';
import {
    EmailService,
    SenderNodemailer,
    SenderSendGrid,
} from '../../service/email';
import {
    UploadFileService,
    LocalFileStorage,
} from '../../service/file-storage';
const authService = new AuthService();

const registration = async (req, res, next) => {
    const { email } = req.body;
    const isUserExist = await authService.isUserExist(email);
    if (isUserExist) {
        return res.status(HttpCode.CONFLICT).json({
            status: 'error',
            code: HttpCode.CONFLICT,
            message: 'Email in use',
        });
    }

    const data = await authService.create(req.body);
    const emailService = new EmailService(
        process.env.NODE_ENV,
        new SenderSendGrid(),
    );

    const isSend = await emailService.sendVerifyEmail(
        email,
        email,
        data.verificationToken,
    );
    delete data.verificationToken;
    res.status(HttpCode.CREATED).json({
        status: 'success',
        code: HttpCode.CREATED,
        user: { ...data, isVerifyEmailSended: isSend },
    });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await authService.getUser(email, password);

    if (!user) {
        return res.status(HttpCode.UNAUTHORIZED).json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Invalid credentials',
        });
    }
    const token = authService.getToken(user);
    await authService.setToken(user.id, token);

    const { subscription } = user;
    res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { token, user: { email, subscription } },
    });
};

const logout = async (req, res, next) => {
    await authService.setToken(req.user.id, null);
    res.status(HttpCode.NO_CONTENT).json({
        status: 'success',
        code: HttpCode.NO_CONTENT,
        data: {},
    });
};

const currentUser = async (req, res, next) => {
    const { email, subscription } = req.user;
    res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { email, subscription },
    });
};

const updateSubscription = async (req, res, next) => {
    const { email, id } = req.user;
    const { subscription } = req.body;
    await authService.setSubscription(id, subscription);

    res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { email, subscription },
    });
};

const uploadAvatar = async (req, res, next) => {
    const uploadService = new UploadFileService(
        LocalFileStorage,
        req.file,
        req.user,
    );

    const avatarUrl = await uploadService.updateAvatar();

    res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        avatarUrl,
    });
};

const verification = async (req, res, next) => {
    const { verificationToken } = req.params;

    const user = await authService.isUserWithToken(verificationToken);

    if (user) {
        await authService.verify(user.id);
        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            message: 'Verification successful',
        });
    }

    res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'Invalid verification token',
    });
};

const repeatVerificationEmail = async (req, res, next) => {};

export {
    registration,
    login,
    logout,
    currentUser,
    updateSubscription,
    uploadAvatar,
    verification,
    repeatVerificationEmail,
};
