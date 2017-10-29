'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Addresses', {
      id: {
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      label: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING
      },
      type: {
        values: ['Home', 'Work', 'Other'],
        defaultValue: 'Other',
        type: Sequelize.ENUM
      },
      address: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      postcode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      directions: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValaue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValaue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Addresses');
  }
};
