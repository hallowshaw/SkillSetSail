import { mongoose } from 'mongoose';
import validator from 'validator';
import bcrpyt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name!"],
        minLength: [3, "Name must contain at least 3 characters!"],
        maxLength: [30, "Name should not exceed 30 characters!"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email!"],
        validate: [validator.isEmail, "Please provide a valid email!"]
    },
    phone: {
        type: Number,
        required: [true, "Please provide your phone number."]
    },
    password: {
        type: String,
        required: [true, "Please provide your password!"],
        minLength: [8, "Password must contain at least 8 characters!"],
        maxLength: [32, "Password should not exceed 32 characters!"],
    },
    role: {
        type: String,
        required: [true, "Please provide your role"],
        enum: ["Job Seeker", "Employer"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})


