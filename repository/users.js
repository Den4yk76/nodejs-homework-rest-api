import User from '../model/user';

const findById = async id => {
    return await User.findById(id);
};

const findByEmail = async email => {
    return await User.findOne({ email });
};

const findByToken = async verificationToken => {
    return await User.findOne({ verificationToken });
};

const create = async body => {
    const user = new User(body);
    return await user.save();
};

const updateToken = async (id, token) => {
    return await User.updateOne({ _id: id }, { token });
};

const setSubscription = async (id, subscription) => {
    return await User.updateOne({ _id: id }, { subscription });
};

const updateAvatar = async (userId, avatarUrl) => {
    return await User.updateOne({ _id: userId }, { avatarUrl });
};

const verify = async userId => {
    return await User.updateOne(
        { _id: userId },
        { verificationToken: null, verify: true },
    );
};

export default {
    findById,
    findByEmail,
    findByToken,
    create,
    updateToken,
    setSubscription,
    updateAvatar,
    verify,
};
