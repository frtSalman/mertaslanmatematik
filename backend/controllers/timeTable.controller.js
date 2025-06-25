import models from '../models/index.model.js';
const { Users, Timetable, Homework } = models;

export const getSchedule = async (req, res) => {
    const { studentId } = req.params;

    try {
        let program = await Timetable.findOne({
            where: { studentId },
        });

        if (!program) {
            await Timetable.create({
                studentId,
                program: {
                    Pazartesi: [],
                    Salı: [],
                    Carşamba: [],
                    Perşembe: [],
                    Cuma: [],
                    Cumartesi: [],
                    Pazar: [],
                },
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Öğrenciye ait program bulundu.',
            program: !program
                ? {
                      Pazartesi: [],
                      Salı: [],
                      Carşamba: [],
                      Perşembe: [],
                      Cuma: [],
                      Cumartesi: [],
                      Pazar: [],
                  }
                : program,
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

export const getAllSchedule = async (req, res) => {
    const { role, userId } = req.query;
    try {
        let allPrograms;
        if (role === 'teacher') {
            allPrograms = await Timetable.findAll({
                where: { teacherId: userId },
                include: [
                    {
                        model: Users, // İlişkili model
                        as: 'student', // Timetable.associate içindeki alias
                        attributes: ['name'], // Sadece name alanını getir
                    },
                    {
                        model: Homework, // İlişkili model
                        as: 'homework', // Timetable.associate içindeki alias
                        attributes: ['homeworkDayNum', 'homeworkStatus', 'id'],
                    },
                ],
            });
        } else {
            allPrograms = await Timetable.findAll({
                where: { studentId: userId },
                include: [
                    {
                        model: Homework, // İlişkili model
                        as: 'homework', // Timetable.associate içindeki alias
                        attributes: ['homeworkDayNum', 'homeworkStatus', 'id'],
                    },
                ],
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Öğrenciye ait program bulundu.',
            allPrograms,
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

/* export const postSchedule = async (req, res) => {
    const { studentId, programData, teacherId, program_deadline } = req.body;

    try {
        // 1. Find or create timetable
        let [programEx, created] = await Timetable.findOrCreate({
            where: { studentId },
            defaults: { program: {}, teacherId },
        });

        // 2. Get existing program or initialize empty
        const existingProgram = programEx.program || {};

        // 3. Merge new data with existing program
        const mergedProgram = { ...existingProgram };

        // Process incoming days with time periods
        for (const [day, entries] of Object.entries(programData)) {
            // Initialize day array if not exists
            if (!mergedProgram[day]) mergedProgram[day] = [];

            // Remove existing entries with same period before adding new ones
            entries.forEach(newEntry => {
                // Filter out existing entries with same period
                mergedProgram[day] = mergedProgram[day].filter(
                    existingEntry => existingEntry.period !== newEntry.period
                );
                // Add new entry
                mergedProgram[day].push(newEntry);
            });
        }

        // 4. Update timetable
        const [affectedRows] = await Timetable.update(
            { program: mergedProgram, teacherId, program_deadline },
            { where: { studentId } }
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Öğrenci programı bulunamadı.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Program başarıyla güncellendi.',
            program: mergedProgram,
        });
    } catch (error) {
        console.error('Schedule update error:', error);
        return res.status(500).json({
            success: false,
            message: 'Sunucu hatası oluştu.',
        });
    }
}; */

export const postSchedule = async (req, res) => {
    const { studentId, programData, teacherId, program_deadline, homeworkId } =
        req.body;

    try {
        /* // 1. Find or create timetable
        let [programEx, created] = await Timetable.findOrCreate({
            where: { studentId },
            defaults: { program: {}, teacherId },
        });

        // 2. Get existing program or initialize empty
        const existingProgram = programEx.program || {};

        // 3. Merge new data with existing program
        const mergedProgram = { ...existingProgram };

        // Process incoming days with time periods
        for (const [day, entries] of Object.entries(programData)) {
            // Initialize day array if not exists
            if (!mergedProgram[day]) mergedProgram[day] = [];

            // Remove existing entries with same period before adding new ones
            entries.forEach(newEntry => {
                // Filter out existing entries with same period
                 mergedProgram[day] = mergedProgram[day].filter(
                    existingEntry => existingEntry.period !== newEntry.period
                ); 
                // Add new entry
                mergedProgram[day].push(newEntry);
            });
        } */

        console.trace(programData);

        // 4. Update timetable
        const timeTable = await Timetable.create({
            program: programData,
            teacherId,
            program_deadline,
            studentId,
            homeworkId,
        });

        return res.status(200).json({
            success: true,
            message: 'Program başarıyla güncellendi.',
            program: timeTable,
        });
    } catch (error) {
        console.error('Schedule update error:', error);
        return res.status(500).json({
            success: false,
            message: 'Sunucu hatası oluştu.',
        });
    }
};

export const deleteSchedule = async (req, res) => {
    const { studentId, programData } = req.body;

    try {
        const program = await Timetable.update(
            { program: programData },
            { where: { studentId } }
        );

        return res.status(200).json({
            success: true,
            message: 'Program üretildi.',
            program,
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
