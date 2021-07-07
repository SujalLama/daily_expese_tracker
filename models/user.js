const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
        isAlphanumeric: true,
        len: {
            args: [5, 50],
            message: 'Username must be greater than 5 and less than 50 of length.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
    updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
  });
  //encrypting the password
  User.beforeCreate((user) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  })
  //generating token
  User.prototype.generateToken = function () {
    let newtoken = jwt.sign(this.id, process.env.SECRET_KEY);
    return newtoken;
  }

//   User.associate = (models) => {
//     User.hasOne(models.Parent, {
//       foreignKey: 'userId'
//     });

//     User.hasOne(models.Teacher, {
//       foreignKey: 'userId'
//     });
    
//     User.belongsTo(models.Role, {
//       foreignKey: 'roleId'
//     });
//     User.hasOne(models.Student, {
//       foreignKey: 'userId'
//     })
//     // User.belongsToMany(models.Team, {
//     //   through: 'members'
//     // })
//   };

  return User;
};