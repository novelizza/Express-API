const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    // eslint-disable-next-line camelcase
    const supplier_session = sequelize.define('supplier_session', {
        supplier_session_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        supplier_id: {
            type: DataTypes.BIGINT,
        },
        session: {
            type: DataTypes.STRING,
        },
        expire_value: {
            type: DataTypes.INTEGER,
        },
        expired_at: {
            type: DataTypes.DATE,
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
        tableName: 'supplier_session',
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
    supplier_session.associate = () => {
        // associations can be defined here
    };
    // eslint-disable-next-line camelcase
    return supplier_session;
};
