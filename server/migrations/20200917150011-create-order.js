module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('order', {
        order_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: Sequelize.BIGINT,
        },
        supplier_id: {
            type: Sequelize.BIGINT,
        },
        dropshipper_id: {
            type: Sequelize.BIGINT,
        },
        product_sku: {
            type: Sequelize.STRING,
        },
        product_price: {
            type: Sequelize.BIGINT,
        },
        product_markup_price: {
            type: Sequelize.BIGINT,
        },
        is_product_discount: {
            type: Sequelize.BOOLEAN,
        },
        product_discount: {
            type: Sequelize.BIGINT,
        },
        product_quantity: {
            type: Sequelize.INTEGER,
        },
        order_quantity: {
            type: Sequelize.INTEGER,
        },
        address: {
            type: Sequelize.TEXT,
        },
        description: {
            type: Sequelize.TEXT,
        },
        payment_date: {
            type: Sequelize.DATE,
        },
        settlement_date: {
            type: Sequelize.DATE,
        },
        total_price: {
            type: Sequelize.BIGINT,
        },
        order_status: {
            type: Sequelize.ENUM('pending', 'accepted', 'rejected'),
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('order'),
};
