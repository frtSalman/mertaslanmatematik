import models from '../models/index.model.js';
const { Users } = models;

export const getStudents = async (req, res) => {
    const { teacherId } = req.params;
    console.log(teacherId);
    try {
        const students = await Users.findAll({
            where: { role: 'student', teacherId },
            attributes: { exclude: ['password'] },
        });
        return res.status(200).json({
            success: true,
            message: 'Öğretmene kayıtlı tüm öğrenciler.',
            students,
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
