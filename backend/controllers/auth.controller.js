import models from '../models/index.model.js';
import bcrypt from 'bcrypt';
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import { generateToken } from '../utils/generateToken.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import {
    sendVerificationEmail,
    sendPasswordResetEmail,
    sendResetSuccessEmail,
    sendStudentInvitationEmail,
} from '../utils/sendEmail.js';

const { Users, Invitation } = models;

// creating user
export const signup = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        //Firt verification
        if (!email || !name || !password) {
            return res.status(400).json({
                success: false,
                message: 'Tüm alanlar doldurulmalıdır.',
            });
        }

        const isUserExist = await Users.findOne({ where: { email: email } });

        if (isUserExist) {
            // 409 Conflict
            res.status(409).json({
                success: false,
                message: 'Bu email adresi ile kayıtlı kullanıcı bulunmaktadır.',
            });
        }

        // Create verificationToken and verificationTokenExpiresAt
        const verificationToken = generateVerificationToken();
        const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

        // Create User
        const user = await Users.create({
            email,
            name,
            password: password.trim(),
            verificationToken,
            verificationTokenExpiresAt,
        });

        //jwt proccess
        generateTokenAndSetCookie(res, user.id); // thats how we auth and proceed as logged in

        //sending verification email
        await sendVerificationEmail(email, verificationToken);

        res.status(200).json({
            succes: true,
            message: 'User has created successfuly.',
            user: {
                ...user.dataValues,
                password: undefined,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            // 500 Internal Server Error
            success: false,
            message: 'Sunucu hatası oluştu.',
        });
    }
};

export const sendInvitation = async (req, res) => {
    const { email, teacherId } = req.body;
    try {
        const ınvToken = generateToken();

        await Invitation.create({
            email,
            teacherId: teacherId,
            token: ınvToken,
        });

        await sendStudentInvitationEmail(email, ınvToken);

        res.status(200).json({
            succes: true,
            message: 'Kayıt davetiyesi başarılı bir şekilde gönderildi. 🛩️',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            // 500 Internal Server Error
            success: false,
            message: 'Sunucu hatası oluştu.',
        });
    }
};

export const studentSignup = async (req, res) => {
    const token = req.params.token;
    const { email, name, password, grade } = req.body;

    try {
        const inv = await Invitation.findOne({ where: { token, email } });
        if (!inv || inv.used) {
            return res.status(401).json({
                success: false,
                message: 'Geçersiz veya kullanılmış link.',
            });
        }

        inv.used = true;
        await inv.save();

        // İzin varsa:
        const student = await Users.create({
            name,
            grade,
            email,
            password: password,
            role: 'student',
            isVerified: true,
            teacherId: inv.teacherId,
        });

        res.status(200).json({
            success: true,
            message: 'Öğrenci başarılı bir şekilde kayıt edildi.',
            user: {
                ...student.dataValues,
                password: undefined,
            },
        });
    } catch (error) {
        console.trace(error.message);
        res.status(500).json({
            // 500 Internal Server Error
            success: false,
            message: 'Sunucu hatası oluştu.',
        });
    }
};

export const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        const user = await Users.findOne({
            where: { verificationToken: code },
        });

        const now = new Date();
        // now do the expiry check in JS
        if (
            !user ||
            !user.verificationTokenExpiresAt || // no expiry date at all
            user.verificationTokenExpiresAt <= now // already expired
        ) {
            return res.status(401).json({
                success: false,
                message: 'Geçersiz veya süresi dolmuş kod.',
            });
        }

        user.verificationToken = null;
        user.verificationTokenExpiresAt = null;
        user.isVerified = true;
        await user.save();

        // sending welcome email

        res.status(200).json({
            success: true,
            message: 'Email has verified successfuly.',
            user: {
                ...user.dataValues,
                password: undefined,
            },
        });
    } catch (error) {
        console.trace(error.message);
        res.status(500).json({
            // 500 Internal Server Error
            success: false,
            message: 'Sunucu hatası oluştu.',
        });
    }
};

export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfuly.' });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    console.log(email);

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email ve parola alanları zorunludur.',
        });
    }

    try {
        const user = await Users.findOne({ where: { email: email } });

        if (!user) {
            return res.status(401).json({
                // 401 Unauthorized
                success: false, // success false olmalı
                message: 'Kullanıcı bulunamadı.', // Yazım hatası düzeltildi
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        console.log(isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                // 401 Unauthorized
                success: false,
                message: 'Parola hatalı.',
            });
        }

        generateTokenAndSetCookie(res, user.id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Kullanıcı başarı ile giriş yaptı.',
            user: {
                ...user.dataValues,
                password: undefined,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            // 500 Internal Server Error
            success: false,
            message: 'Sunucu hatası oluştu.',
        });
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await Users.findOne({ where: { email: email } });

        if (!user) {
            return res
                .status(401)
                .json({ success: true, message: 'Kullanıcı bulunamadı.' });
        }

        const resetPasswordToken = generateToken();
        const resetPasswordTokenExpiresAt = new Date(
            Date.now() + 15 * 60 * 1000
        );

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;

        await sendPasswordResetEmail(email, resetPasswordToken);

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Kullanıcıya parola yenileme emaile gönderildi.',
            user: {
                ...user.dataValues,
                password: undefined,
            },
        });
    } catch (error) {
        console.trace(error.message);
        res.status(500).json({
            // 500 Internal Server Error
            success: false,
            message: 'Sunucu hatası oluştu.',
        });
    }
};

export const resetPassword = async (req, res) => {
    const resetPasswordTokenURL = req.params.token;
    const { password } = req.body;
    try {
        const user = await Users.findOne({
            where: { resetPasswordToken: resetPasswordTokenURL },
        });

        const now = new Date();

        if (
            !user ||
            !user.resetPasswordTokenExpiresAt || // no expiry date at all
            user.resetPasswordTokenTokenExpiresAt <= now // already expired
        ) {
            return res.status(401).json({
                success: false,
                message: 'Geçersiz veya süresi dolmuş link.',
            });
        }

        user.password = password;
        user.resetPasswordToken = null;
        user.resetPasswordTokenExpiresAt = null;

        await user.save();

        //Parolanız yenielndi mesajı yolla!
        await sendResetSuccessEmail(user.email);

        res.status(200).json({
            success: true,
            message: 'Kullanıcı başarı ile parolasını yeniledi.',
            user: {
                ...user.dataValues,
                password: undefined,
            },
        });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, message: 'Server error' });
    }
};

export const checkAuth = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await Users.findOne({ where: { id: userId } });

        if (!user)
            return res
                .status(401)
                .json({ success: false, message: 'Tekrar giriş yapın.' });

        res.status(200).json({
            success: true,
            message: 'Kullanıcı girişi onaylıdır.',
            user: {
                ...user.dataValues,
                password: undefined,
            },
        });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, message: 'Server error' });
    }
};
