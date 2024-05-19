import { catchAsyncError } from "../middleware/catchAsyncError.js"
import errorHandler from '../middleware/error.js'
import { User } from '../models/userSchema.js';

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
    res.status(200).json({
        success: true,
        message: "User Registered",
        user
    })
})