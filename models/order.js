'use strict';
/*
  node_modules/.bin/sequelize model:generate --name Order \
    --attributes id:uuid,status:string,to_address:text,to_postcode:string
*/

module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'submitted', 'canceled', 'confirmed', 'done']
    },
    to_address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    to_postcode: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    comment: 'All the orders ever placed by users',
    validate: {
      // model validations here
    },
    classMethods: {
      associate: function(models) {
        Order.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
        /*Order.hasOne(models.Address, {
          foreignKey: {
            allowNull: true
          }
        });*/
      }
    },
    instanceMethods: {
      /*getDeliveryAddress: () => {
        return this.Address || Address.build({
          address: this.to_address,
          postcode: this.to_postcode,
          name: 'temporary',
        });
      }*/
    }
  });
  return Order;
};
