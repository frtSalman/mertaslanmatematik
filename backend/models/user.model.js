import db from '../utils/database.js';
import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';

const Users = db.define(
    'Users',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        grade: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM('teacher', 'student', 'admin'),
            allowNull: false,
            defaultValue: 'teacher',
        },
        teacherId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        lastLogin: DataTypes.DATE,
        isVerified: DataTypes.BOOLEAN,
        resetPasswordToken: DataTypes.STRING,
        resetPasswordTokenExpiresAt: DataTypes.DATE,
        verificationToken: DataTypes.STRING,
        verificationTokenExpiresAt: DataTypes.DATE,
    },
    {
        hooks: {
            beforeCreate: async user => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async user => {
                // Only hash if password is modified
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
        },
        tableName: 'users',
    }
);

Users.associate = models => {
    // Bir öğretmenin birden çok öğrencisi olur:
    Users.hasMany(models.Users, {
        as: 'students',
        foreignKey: 'teacherId',
        constraints: false,
        scope: { role: 'student' },
        onDelete: 'CASCADE',
    });
    // Bir öğrenci tek bir öğretmene aittir:
    Users.belongsTo(models.Users, {
        as: 'teacher',
        foreignKey: 'teacherId',
        constraints: false,
        onDelete: 'CASCADE',
    });
    Users.hasMany(models.Homework, {
        foreignKey: 'studentId',
        as: 'homeworks',
        onDelete: 'CASCADE',
    });
    Users.hasMany(models.Timetable, {
        foreignKey: 'studentId',
        as: 'timetables',
        onDelete: 'CASCADE',
    });
};

export default Users;
