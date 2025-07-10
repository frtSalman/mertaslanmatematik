import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {
    VERIFICATION_EMAIL_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    STUDENT_INV_TEMPLATE,
} from './emailTemplates.js';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.my_mail,
        pass: process.env.password,
    },
});

export const sendVerificationEmail = async (userEmail, verificationToken) => {
    try {
        const info = await transporter.sendMail({
            from: `mertaslanmatematik@gmail.com`,
            to: userEmail,
            subject: 'Email Adresini Doğrula! ✅',
            html: VERIFICATION_EMAIL_TEMPLATE.replace(
                '{verificationCode}',
                verificationToken
            ),
        });
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export const sendPasswordResetEmail = async (userEmail, resetPasswordToken) => {
    try {
        const info = await transporter.sendMail({
            from: `mertaslanmatematik@gmail.com`,
            to: userEmail,
            subject: 'Parola Yenileme Linki 🎯',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
                '{resetURL}',
                `https://www.mertaslanmatematik.com/reset-password/${resetPasswordToken}`
            ),
        });
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export const sendResetSuccessEmail = async userEmail => {
    try {
        const info = await transporter.sendMail({
            from: `mertaslanmatematik@gmail.com`,
            to: userEmail,
            subject: 'Parola Yenileme İşlemi Başarılı 🙌',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        });
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export const sendStudentInvitationEmail = async (userEmail, signupToken) => {
    try {
        const info = await transporter.sendMail({
            from: `mertaslanmatematik@gmail.com`,
            to: userEmail,
            subject: 'Kayıt İşlemleri 🧾',
            html: STUDENT_INV_TEMPLATE.replace(
                '{resetURL}',
                `https://www.mertaslanmatematik.com/student-signup/${signupToken}`
            ),
        });
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
