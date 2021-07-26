module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('supplier_transaction_activity', {
        supplier_transaction_activity_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        supplier_transaction_id: {
            type: Sequelize.BIGINT,
        },
        status: {
            type: Sequelize.ENUM('settlement', 'pending', 'cancel'),
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('supplier_transaction_activity'),
};
