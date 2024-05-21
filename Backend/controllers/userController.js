import { catchAsyncError } from "../middleware/catchAsyncError.js"
import errorHandler from '../middleware/error.js'
import { User } from '../models/userSchema.js';
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, role, password } = req.body;

    if (!name || !email || !phone || !role || !password) {
        return next(new errorHandler("Please fill the registration form!"))
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new errorHandler("Email already registered"))
    }
    const user = await User.create({
        name, email, phone, role, password
    })
    sendToken(user, 200, res, "User Registered Successfully!")
});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new errorHandler("Please provide email, password and the role.", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new errorHandler("Invalid Email or Password.", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new errorHandler("Invalid Email or Password.", 400));
    }
    if (user.role !== role) {
        return next(
            new errorHandler(`User with provided email and ${role} not found!`, 404)
        );
    }
    sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncError(async (req, res, next) => {
    res
        .status(201)
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Logged Out Successfully.",
        });
});