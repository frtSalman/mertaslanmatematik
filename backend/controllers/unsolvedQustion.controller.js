import UnsolvedQuestion from '../models/unsolvedQuesiton.model.js';

const BUNNY_ZONE = 'mert-aslan-matematik';

const baseHost = 'storage.bunnycdn.com';

export const getUQURL = async (req, res) => {
    const queries = req.query;

    try {
        let questions;

        if (queries.role === 'student') {
            questions = await UnsolvedQuestion.findAll({
                where: {
                    studentId: queries.id,
                    teacherId: queries.teacherId,
                },
            });
        } else {
            questions = await UnsolvedQuestion.findAll({
                where: {
                    studentId: queries.studentId,
                    teacherId: queries.id,
                },
            });
        }

        res.json({
            success: true,
            questions,
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

export const uploadUQURL = async (req, res) => {
    console.log(
        '🤖 hit POST /api/uploads/unsolved-question-url',
        req.method,
        req.headers.origin
    );
    const { homeworkId, studentId, teacherId, subject, studentName, pages } =
        req.body;

    /* if (!filename) return res.status(400).json({ error: 'Filename required' }); */

    const filename = `${studentName}-${subject}`;

    const safeFilename = filename.replace(/\s+/g, '-');

    const uniqueName = `${Date.now()}-${safeFilename}.webp`;

    const uploadUrl = `https://${baseHost}/${BUNNY_ZONE}/${uniqueName}`;
    const pullZoneURL = `https://cdn.mertaslanmatematik.com/${uniqueName}`;

    try {
        await UnsolvedQuestion.create({
            imageUrl: pullZoneURL,
            homeworkId,
            studentId,
            teacherId,
            subject,
            pages,
        });

        res.json({
            success: true,
            message: 'Fotoğraf oluşturuldu.',
            uploadUrl,
            filePath: uniqueName,
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

export const deleteUQURL = async (req, res) => {
    const path = req.params.path;
    const deleteUrl = `https://${baseHost}/${BUNNY_ZONE}/${path}`;

    try {
        await UnsolvedQuestion.destroy({
            where: { imageUrl: `https://cdn.mertaslanmatematik.com/${path}` },
        });

        res.json({
            success: true,
            message: 'Fotoğraf silindi.',
            deleteUrl,
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

export const updateUQAppearance = async (req, res) => {
    const { bool, id } = req.query;

    try {
        await UnsolvedQuestion.update({ show: bool }, { where: { id } });

        res.json({
            success: true,
            questionId: id,
            message: 'Görünüm güncellendi.',
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
