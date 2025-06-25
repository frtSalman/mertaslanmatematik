import models from '../models/index.model.js';

const { Homework, Users } = models;

export const getHomeworks = async (req, res) => {
    const { role, userId } = req.query;

    try {
        let homeworks;
        if (role === 'teacher') {
            homeworks = await Homework.findAll({
                where: { teacherId: userId },
                include: [
                    {
                        model: Users,
                        as: 'student',
                        attributes: ['name'], // Select specific fields
                    },
                ],
            });
        }
        if (role === 'student') {
            homeworks = await Homework.findAll({
                where: { studentId: userId },
                include: [
                    {
                        model: Users,
                        as: 'student',
                        attributes: ['name'], // Select specific fields
                    },
                ],
            });
        }
        return res.status(200).json({
            success: true,
            message: 'İlgili öğretmenin verdiği ödevler',
            homeworks,
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

export const addHomework = async (req, res) => {
    const { homework } = req.body;

    try {
        const result = await Homework.create({
            ...homework,
        });

        res.status(200).json({
            success: true,
            massage: 'İlgili öğretmenin verdiği ödev eklendi.',
            data: result,
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

export const deleteHomework = async (req, res) => {
    const { id } = req.params;

    try {
        // Attempt to delete the row
        const deletedCount = await Homework.destroy({
            where: { id },
        });

        if (deletedCount === 0) {
            // No rows matched that id
            return res.status(404).json({
                success: false,
                message: 'Silinecek ödev bulunamadı.',
            });
        }

        // Successfully deleted
        return res.status(200).json({
            success: true,
            message: 'Ödev başarıyla silindi.',
            deletedId: id,
        });
    } catch (error) {
        console.trace(error);
        return res.status(500).json({
            success: false,
            message: 'Sunucu hatası oluştu.',
        });
    }
};

export const updateHomework = async (req, res) => {
    const { homework } = req.body;

    console.trace(homework);

    try {
        await Homework.update(
            {
                homeworkContent: homework.homeworkContent,
                period: homework.period,
                program: homework.program,
                homeworkDayNum: homework.homeworkDayNum,
                homeworkDeadline: homework.homeworkDeadline,
                homeworkStatus: homework.homeworkStatus,
                homeworkFilePath: homework.homeworkFilePath,
                teacherId: homework.teacherId,
            },
            { where: { id: homework.homeworkId } }
        );

        res.status(200).json({
            success: true,
            message: 'Ödev güncellenmiştir.',
        });
    } catch (error) {
        console.trace(error);
        return res.status(500).json({
            success: false,
            message: 'Sunucu hatası oluştu.',
        });
    }
};

export const updateHomeworkStatus = async (req, res) => {
    const homeworkId = req.params.id;

    try {
        await Homework.update(
            { homeworkStatus: true },
            { where: { id: homeworkId } }
        );

        res.status(200).json({
            success: true,
            message: 'Ödev tamamlanmıştır.',
            homeworkId: homeworkId,
        });
    } catch (error) {
        console.trace(error);
        return res.status(500).json({
            success: false,
            message: 'Sunucu hatası oluştu.',
        });
    }
};
