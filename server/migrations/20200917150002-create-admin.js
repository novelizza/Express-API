module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('admin', {
        admin_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        admin_role_id: {
            type: Sequelize.INTEGER,
        },
        full_name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        profile_picture: {
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('admin'),
};
