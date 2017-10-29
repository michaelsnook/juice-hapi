'use strict';

/*
  node_modules/.bin/sequelize model:generate --name User \
    --attributes id:uuid,name:string,email:string,phone:string
*/

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        notNull: { args: true, msg: 'Phone cannot be null' }
      }
    }
  }, {
    comment: 'Our users',
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Order);
        User.hasMany(models.Address);
      }
    },
    instanceMethods: {
      //
    }
  });
  return User;
};
