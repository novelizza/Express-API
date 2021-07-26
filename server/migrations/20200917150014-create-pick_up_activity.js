module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('pick_up_activity', {
        pick_up_activity_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        pick_up_id: {
            type: Sequelize.BIGINT,
        },
        status: {
            type: Sequelize.ENUM('accepted', 'going_to_supplier', 'picked_up_from_supplier', 'going_to_warehouse', 'complete', 'cancel'),
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('pick_up_activity'),
};
