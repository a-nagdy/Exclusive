import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user']
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobile: {
        type: String
    },
    avatar: {
        type: String
    },
    address: {
        type: [{
            city: { type: String },
            state: { type: String },
            zip: { type: String },
            country: { type: String }
        }],
        default: []
    },
    resetToken: {
        type: String
    },
    expireToken: {
        type: Date
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;