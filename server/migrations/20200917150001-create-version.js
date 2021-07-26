module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('version', {
        version_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        version: {
            type: Sequelize.STRING,
        },
        os: {
            type: Sequelize.TEXT,
        },
        status: {
            type: Sequelize.ENUM('force', 'optional', 'soft'),
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('version'),
};
