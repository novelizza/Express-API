module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('supplier', {
        supplier_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        supplier_number: {
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
        id_number: {
            type: Sequelize.STRING,
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
        province: {
            type: Sequelize.STRING,
        },
        city: {
            type: Sequelize.STRING,
        },
        district: {
            type: Sequelize.STRING,
        },
        village: {
            type: Sequelize.STRING,
        },
        postal_code: {
            type: Sequelize.STRING,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('supplier'),
};
