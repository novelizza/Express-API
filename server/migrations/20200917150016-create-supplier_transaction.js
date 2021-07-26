module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('supplier_transaction', {
        supplier_transaction_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        supplier_id: {
            type: Sequelize.BIGINT,
        },
        order_id: {
            type: Sequelize.BIGINT,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('supplier_transaction'),
};
