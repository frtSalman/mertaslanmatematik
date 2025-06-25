import db from '../utils/database.js';
import { DataTypes } from 'sequelize';
import Users from './user.model.js';
import Homework from './homework.model.js';

const Timetable = db.define(
    'Timetable',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        program: {
            type: DataTypes.JSONB,
            defaultValue: {},
            allowNull: false,
        },
        studentId: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
            references: {
                model: Users,
                key: 'id',
            },
        },
        teacherId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: Users,
                key: 'id',
            },
        },
        homeworkId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: Homework,
                key: 'id',
            },
        },
        program_deadline: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'timetables',
    }
);

Timetable.associate = models => {
    Timetable.belongsTo(models.Users, {
        foreignKey: 'studentId',
        as: 'student',
    });

    Timetable.belongsTo(models.Homework, {
        foreignKey: 'homeworkId',
        as: 'homework',
        onDelete: 'CASCADE',
    });
};

export default Timetable;
