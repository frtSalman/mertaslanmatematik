import StatEntry from '../models/statistic.model.js';

export const addStats = async (req, res) => {
    const { stats } = req.body;

    try {
        const result = await StatEntry.create({ ...stats });

        res.status(200).json({
            success: true,
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

export const getStudentStats = async (req, res) => {
    const { id } = req.params;

    try {
        const stats = await StatEntry.findAll({
            where: { studentId: id },
        });

        res.status(200).json({
            success: true,
            stats,
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

export const getHomeworkStats = async (req, res) => {
    const { id } = req.params;

    try {
        const stats = await StatEntry.findAll({
            where: { homeworkId: id },
        });

        res.status(200).json({
            success: true,
            stats,
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

export const updateStats = async (req, res) => {
    const { stats } = req.body;

    try {
        await StatEntry.update(
            {
                attempted: stats.attempted,
                correct: stats.correct,
                pages: stats.pages,
                unsolvedQPaths: stats.unsolvedQPaths,
            },
            { where: { id: stats.id } }
        );

        res.status(200).json({
            success: true,
            message: 'Güncelleme gerçekleşmiştir.',
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
