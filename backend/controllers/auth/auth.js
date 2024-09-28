// Node.js built-in modules
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from 'url';

// Third-party modules
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Internal modules
import sendEmailHandler from "../../middleware/emailHandler/sendEmailHandler.js";
import validateRequiredFields from "../../middleware/validations/validateRequiredFields.js";
import User from "../../models/auth/auth.js";

// Setup __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const authController = {
    signup: async (req, res) => {
        try {
            const {
                email,
                password,
                confirmPassword,
                role = "user",
                firstName,
                lastName,
                avatar,
                mobile,
                address,
            } = req.body;
            const userRequiredFields = [
                "email",
                "password",
                "confirmPassword",
                "firstName",
                "lastName",
                "mobile",
            ];

            validateRequiredFields(userRequiredFields, req, res);

            if (password !== confirmPassword) {
                return res
                    .status(400)
                    .json({ message: "Password and Confirm Password do not match", status: 400 });
            }

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: "User with this email already exists", status: 400 });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await User.create({
                email,
                password: hashedPassword,
                confirmPassword: hashedPassword,
                role,
                firstName,
                lastName,
                mobile,
                avatar: avatar || "",
                address: address || [{ city: "", state: "", zip: "", country: "" }],
            });

            await user.save();

            res
                .status(201)
                .json({
                    message: "User created successfully",
                    status: 201,
                    user: {
                        ...user._doc,
                        password: undefined,
                        confirmPassword: undefined,
                    },
                });
        } catch (error) {
            res.status(500).json({ error: error.message, status: 500 });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Email not found", status: 404 });
            }
            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res
                    .status(403)
                    .json({ message: "Password is incorrect", status: 403 });
            }

            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user._id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            );

            res
                .status(200)
                .json({
                    message: "Logged in successfully",
                    status: 200,
                    user: {
                        ...user._doc,
                        userToken: token,
                        password: undefined,
                        confirmPassword: undefined,
                    },
                });
        } catch (error) {
            res.status(500).json({ error: error.message, status: 500 });
        }
    },
    forgetPassword: async (req, res) => {
        const { email, hrefUrl, supportUrl } = req.body;

        console.log(os.platform());
        console.log(req);
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(404)
                    .json({
                        message: "User with this email does not exist",
                        status: 404,
                    });
            }

            const token = await jwt.sign({ email }, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });

            user.resetToken = token;
            user.expireToken = Date.now() + (24 * 60 * 60 * 1000);

            await user.save();


            const resetPasswordTemplate = fs.readFileSync(path.join(__dirname, "../../templates/password-reset.html"), "utf-8");
            const userName = user.firstName + " " + user.lastName;

            let emailBody = resetPasswordTemplate
                .replace("[Company Name, LLC]", "Oreka, LLC")
                .replace('{{name}}', userName)
                .replace('{{email}}', user.email)
                .replace("{{operating_system}}", os.platform())
                .replace('{{action_url}}', `${hrefUrl || `http://localhost:3000/reset-password?resetToken=${token}`}`)
                .replace("{{support_url}}", `${supportUrl || `http://localhost:3000/support`}`)

            await sendEmailHandler(
                email,
                "Reset Password",
                emailBody
            );

            res.status(200).json({
                message: "Reset password link sent to your email",
                status: 200,
            });
        } catch (error) {
            res.status(500).json({ error: error.message, status: 500 });
        }
    },
    resetPassword: async (req, res) => {
        const newPassword = req.body.newPassword;
        const newPasswordConfirm = req.body.newPasswordConfirm;
        const token = req.body.token;


        if (!newPassword || !newPasswordConfirm) {
            return res.status(400).json({ message: "All fields are required", status: 400 });
        };

        if (newPassword !== newPasswordConfirm) {
            return res.status(400).json({ message: "New Password and Confirm Password do not match", status: 400 });
        };

        try {
            const user = await User.findOne({ resetToken: token, expireToken: { $gt: Date.now() } });

            if (!user) {
                return res.status(401).json({ message: "Invalid or Expired Token", status: 401 });
            };

            const hashedPassword = await bcrypt.hash(newPassword, 12);

            user.password = hashedPassword;
            user.confirmPassword = hashedPassword;
            user.resetToken = undefined;
            user.expireToken = undefined;

            await user.save();

            res.status(200).json({ message: "Password reset successfully ", status: 200 });

        } catch (error) {
            return res.status(500).json({ error: error.message, status: 500 });
        }
    },
};

export default authController;