const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const category = sequelize.define('category', {
        category_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        parent_id: {
            type: DataTypes.BIGINT,
        },
        name: {
            type: DataTypes.STRING,
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
        tableName: 'category',
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
    category.associate = (models) => {
        // associations can be defined here
        category.belongsTo(models.product, {
            foreignKey: 'category_id',
            as: 'categoryProduct',
        });
    };
    return category;
};
