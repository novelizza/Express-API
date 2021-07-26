module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('dropshipper', {
        dropshipper_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        dropshipper_number: {
            type: Sequelize.STRING,
        },
        full_name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        phone_number: {
            type: Sequelize.STRING,
        },
        birth_date: {
            type: Sequelize.DATE,
        },
        gender: {
            type: Sequelize.ENUM('m', 'f'),
        },
        id_number: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
        },
        occupation_id: {
            type: Sequelize.INTEGER,
        },
        password: {
            type: Sequelize.STRING,
        },
        email_token: {
            type: Sequelize.STRING,
        },
        profile_picture: {
            type: Sequelize.STRING,
        },
        profit: {
            type: Sequelize.BIGINT,
        },
        poin: {
            type: Sequelize.BIGINT,
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        deleted_at: {
            type: Sequelize.DATE,
        },
    }),
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => queryInterface.dropTable('dropshipper'),
};
