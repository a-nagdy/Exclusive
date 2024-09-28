import 'dotenv/config';
import nodemailer from 'nodemailer';

const sendEmailHandler = async (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    return transporter.sendMail({
        to: email,
        subject,
        html
    });
};

export default sendEmailHandler;