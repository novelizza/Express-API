const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define('product', {
        product_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        brand_id: {
            type: DataTypes.INTEGER,
        },
        supplier_id: {
            type: DataTypes.INTEGER,
        },
        category_id: {
            type: DataTypes.INTEGER,
        },
        product_number: {
            type: DataTypes.STRING,
        },
        sku: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.BIGINT,
        },
        markup_price: {
            type: DataTypes.BIGINT,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        is_discount: {
            type: DataTypes.BOOLEAN,
        },
        discount: {
            type: DataTypes.STRING,
        },
        is_warranty: {
            type: DataTypes.BOOLEAN,
        },
        warranty_expire_date: {
            type: DataTypes.DATE,
        },
        warranty_for: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
        },
        deleted_at: {
            allowNull: true,
            type: DataTypes.DATE,
            get() {
                if (this.getDataValue('deleted_at')) {
                    const dateText = this.getDataValue('deleted_at');
                    return moment(dateText).tz('Asia/Jakarta').format();
                }
                return null;
            },
        },
        created_at: {
            allowNull: true,
            type: DataTypes.DATE,
            get() {
                if (this.getDataValue('created_at')) {
                    const dateText = this.getDataValue('created_at');
                    return moment(dateText).tz('Asia/Jakarta').format();
                }
                return null;
            },
        },
        updated_at: {
            allowNull: true,
            type: DataTypes.DATE,
            get() {
                if (this.getDataValue('updated_at')) {
                    const dateText = this.getDataValue('updated_at');
                    return moment(dateText).tz('Asia/Jakarta').format();
                }
                return null;
            },
        },
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'product',
        deletedAt: 'deleted_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        scopes: {
            ordering: (ordering) => ({
                order: [
                    [ordering.orderBy, ordering.orderType],
                ],
            }),
            pagination: (param, pagination) => (param !== 'false' ? {
                offset: pagination.page,
                limit: pagination.row,
            } : {}),
        },
    });
    product.associate = () => {
        // associations can be defined here
    };
    return product;
};
