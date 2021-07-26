const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const supplier = sequelize.define('supplier', {
        supplier_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        supplier_number: {
            type: DataTypes.STRING,
        },
        full_name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        phone_number: {
            type: DataTypes.STRING,
        },
        id_number: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        email_token: {
            type: DataTypes.STRING,
        },
        profile_picture: {
            type: DataTypes.STRING,
        },
        province: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        district: {
            type: DataTypes.STRING,
        },
        village: {
            type: DataTypes.STRING,
        },
        postal_code: {
            type: DataTypes.STRING,
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
        tableName: 'supplier',
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
    supplier.associate = (models) => {
        // associations can be defined here
        supplier.belongsTo(models.supplier_session, {
            foreignKey: 'supplier_id',
            as: 'supplierSession',
        });

        supplier.hasMany(models.product, {
            foreignKey: 'supplier_id',
            as: 'supplierProduct',
        });
    };
    return supplier;
};
