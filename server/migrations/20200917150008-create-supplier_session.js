module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('supplier_session', {
        supplier_session_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        supplier_id: {
            type: Sequelize.BIGINT,
        },
        session: {
            type: Sequelize.STRING,
        },
        expire_value: {
            type: Sequelize.INTEGER,
        },
        expired_at: {
            type: Sequelize.DATE,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('supplier_session'),
};
