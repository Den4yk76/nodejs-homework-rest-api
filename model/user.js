import pkg from 'mongoose';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import { uuid } from 'uuidv4';

const { Schema, model } = pkg;

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            validate(value) {
                const re = /\S+@\S+\.\S+/;
                return re.test(String(value).trim().toLowerCase());
            },
        },
        subscription: {
            type: String,
            enum: ['starter', 'pro', 'business'],
            default: 'starter',
        },
        avatarUrl: {
            type: String,
            default: function () {
                return gravatar.url(this.email, { s: '250' }, true);
            },
        },
        token: {
            type: String,
            default: null,
        },
        verificationToken: {
            type: String,
            required: [true, 'Verify token is required'],
            default: function () {
                return uuid();
            },
        },
        verify: {
            type: Boolean,
            default: false,
        },
    },
    {
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret._id;
                return ret;
            },
        },
        toObject: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret._id;
                return ret;
            },
        },
    },
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(6);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

export default User;
