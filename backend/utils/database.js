import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mertaslandb', 'postgres', 'mert1991', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    logging: false,
});

export default sequelize;
