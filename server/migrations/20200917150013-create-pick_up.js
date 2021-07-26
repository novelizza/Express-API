module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('pick_up', {
        pick_up_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        order_id: {
            type: Sequelize.BIGINT,
        },
        courier_id: {
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('pick_up'),
};
