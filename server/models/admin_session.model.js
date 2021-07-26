const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    // eslint-disable-next-line camelcase
    const admin_session = sequelize.define('admin_session', {
        admin_session_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        admin_id: {
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
        tableName: 'admin_session',
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
    admin_session.associate = () => {
        // associations can be defined here
    };
    // eslint-disable-next-line camelcase
    return admin_session;
};
