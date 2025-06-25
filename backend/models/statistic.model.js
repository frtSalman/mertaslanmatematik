import { DataTypes } from 'sequelize';
import db from '../utils/database.js';

const weekDays = [
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
    'Pazar',
];

const StatEntry = db.define(
    'StatEntry',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
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
        homeworkId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        subject: { type: DataTypes.STRING, allowNull: false }, // e.g. "polinomlar"
        pages: { type: DataTypes.STRING, allowNull: false }, // e.g. "günlük yapılan sayfalar"
        day: { type: DataTypes.ENUM(...weekDays), allowNull: false },
        attempted: { type: DataTypes.INTEGER, allowNull: false }, // qN
        correct: { type: DataTypes.INTEGER, allowNull: false }, // cN
        unsolvedQPaths: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull: true,
        },
    },
    {
        tableName: 'stat_entries',
        indexes: [
            { fields: ['studentId', 'homeworkId'] },
            { fields: ['teacherId', 'homeworkId'] },
        ],
    }
);

export default StatEntry;
