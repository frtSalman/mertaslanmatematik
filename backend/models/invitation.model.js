import db from '../utils/database.js';
import { DataTypes } from 'sequelize';
import Users from './user.model.js';

const Invitation = db.define('Invitation', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false, unique: true },
    used: { type: DataTypes.BOOLEAN, defaultValue: false },
    teacherId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users, // model objesiyle referans
            key: 'id',
        },
    },
});

Invitation.associate = models => {
    Invitation.belongsTo(models.Users, {
        as: 'teacher',
        foreignKey: 'teacherId',
        onDelete: 'CASCADE',
    });
};

export default Invitation;
