import UnsolvedQuestion from '../models/unsolvedQuesiton.model.js';

const BUNNY_ZONE = 'mert-aslan-matematik';
const BUNNY_KEY = '0b31dbbc-8909-42a7-850d2d9f9791-d851-4001';

const baseHost = 'storage.bunnycdn.com';

export const getUQURL = async (req, res) => {
    const queries = req.query;

    console.log(queries);

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
    const { homeworkId, studentId, teacherId, subject, studentName, pages } =
        req.body;
    console.log(req.body);
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
            headers: {
                AccessKey: BUNNY_KEY,
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

export const deleteUQURL = async (req, res) => {
    const path = req.params.path;
    const deleteUrl = `https://${baseHost}/${BUNNY_ZONE}/${path}`;

    try {
        await UnsolvedQuestion.destroy({
            where: { imageUrl: `https://cdn.mertaslanmatematik.com/${path}` },
        });

        console.trace(deleteUrl, BUNNY_KEY);

        res.json({
            success: true,
            message: 'Fotoğraf silindi.',
            deleteUrl,
            headers: {
                AccessKey: BUNNY_KEY,
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
