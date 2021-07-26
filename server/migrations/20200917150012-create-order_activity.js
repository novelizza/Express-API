module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('order_activity', {
        order_activity_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        order_id: {
            type: Sequelize.BIGINT,
        },
        status: {
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('order_activity'),
};
