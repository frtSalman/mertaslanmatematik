import { DataTypes } from 'sequelize';
import db from '../utils/database.js';
import Users from './user.model.js';
import UnsolvedQuestion from './unsolvedQuesiton.model.js';

const Homework = db.define(
    'Homework',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        homeworkDeadline: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        homeworkStatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        homeworkFilePath: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull: true,
        },
        homeworkPicPath: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
            allowNull: true,
        },
        homeworkContent: {
            type: DataTypes.JSON,
            defaultValue: null,
            allowNull: true,
        },
        program: {
            type: DataTypes.JSONB,
            defaultValue: {},
            allowNull: false,
        },
        period: {
            type: DataTypes.STRING,
            defaultValue: null,
            allowNull: true,
        },
        homeworkDayNum: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            allowNull: true,
        },
        studentId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Users,
                key: 'id',
            },
        },
        teacherId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Users,
                key: 'id',
            },
        },
    },
    {
        tableName: 'homeworks',
    }
);

Homework.associate = models => {
    Homework.belongsTo(models.Users, {
        foreignKey: 'studentId',
        as: 'student',
        onDelete: 'CASCADE',
    });

    Homework.hasOne(models.Timetable, {
        foreignKey: 'homeworkId',
        as: 'timetable',
        onDelete: 'CASCADE', // Optional: cascade delete
    });

    Homework.hasMany(models.UnsolvedQuestion, {
        foreignKey: 'homeworkId',
        as: 'unsolved_questions',
        onDelete: 'SET NULL', // Optional: cascade delete
    });

    UnsolvedQuestion.belongsTo(models.Homework, { foreignKey: 'homeworkId' });
};

export default Homework;
