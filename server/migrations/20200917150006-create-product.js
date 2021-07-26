module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('product', {
        product_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        brand_id: {
            type: Sequelize.INTEGER,
        },
        supplier_id: {
            type: Sequelize.INTEGER,
        },
        category_id: {
            type: Sequelize.BIGINT,
        },
        product_number: {
            type: Sequelize.STRING,
        },
        sku: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.BIGINT,
        },
        markup_price: {
            type: Sequelize.BIGINT,
        },
        quantity: {
            type: Sequelize.INTEGER,
        },
        is_discount: {
            type: Sequelize.BOOLEAN,
        },
        discount: {
            type: Sequelize.STRING,
        },
        is_warranty: {
            type: Sequelize.BOOLEAN,
        },
        warranty_expire_date: {
            type: Sequelize.DATE,
        },
        warranty_for: {
            type: Sequelize.INTEGER,
        },
        description: {
            type: Sequelize.TEXT,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('product'),
};
