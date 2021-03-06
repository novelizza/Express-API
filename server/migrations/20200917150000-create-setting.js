module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('setting', {
        setting_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        about: {
            type: Sequelize.TEXT,
        },
        privacy_policy: {
            type: Sequelize.TEXT,
        },
        term_and_condition: {
            type: Sequelize.TEXT,
        },
        supplier_session_expiry: {
            type: Sequelize.STRING,
        },
        dropshipper_session_expiry: {
            type: Sequelize.STRING,
        },
        cms_session_expiry: {
            type: Sequelize.STRING,
        },
        android_version_id: {
            type: Sequelize.INTEGER,
        },
        android_version_update_message: {
            type: Sequelize.TEXT,
        },
        android_is_maintenance: {
            type: Sequelize.BOOLEAN,
        },
        android_maintenance_message: {
            type: Sequelize.TEXT,
        },
        ios_version_id: {
            type: Sequelize.INTEGER,
        },
        ios_version_update_message: {
            type: Sequelize.TEXT,
        },
        ios_is_maintenance: {
            type: Sequelize.BOOLEAN,
        },
        ios_maintenance_message: {
            type: Sequelize.TEXT,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('setting'),
};
