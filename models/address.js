'use strict';

/*
  node_modules/.bin/sequelize model:generate --name Address \
    --attributes id:uuid,name:string,type:string,address:text,postcode:string,directions:text
*/
module.exports = (sequelize, DataTypes) => {
  var Address = sequelize.define('Address', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    label: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      set(val='') {
        this.setDataValue('name', val !== '' ? val :
          'Saved address ' + (1 + this.User.getAddresses().length)
        )
      }
    },
    type: {
      type: DataTypes.ENUM,
      values: ['Home', 'Work', 'Other'],
      defaultValue: 'Other'
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Address cannot be null' }
      }
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Postcode cannot be null' }
      }
    },
    directions: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null
    }
  }, {
    comment: 'Saved addresses, belonging to users',
    classMethods: {
      associate: function(models) {
        // Address.hasMany(models.Order);
        Address.belongsTo(models.User);
      }
    }
  });
  return Address;
};
