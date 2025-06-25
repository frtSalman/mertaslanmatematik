import { DataTypes } from 'sequelize';
import db from '../utils/database.js';

const UnsolvedQuestion = db.define(
    'UnsolvedQuestion',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        homeworkId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'homeworks', key: 'id' },
        },
        studentId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
        teacherId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
        subject: { type: DataTypes.STRING, allowNull: false },
        pages: { type: DataTypes.STRING, allowNull: false },
        imageUrl: { type: DataTypes.STRING, allowNull: false },
        show: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { tableName: 'unsolved_questions' }
);

export default UnsolvedQuestion;
