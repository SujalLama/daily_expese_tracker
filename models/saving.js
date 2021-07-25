module.exports = (sequelize, DataTypes) => {
  const Saving = sequelize.define('savings', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    date: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  }, {timestamps: false});
 

    Saving.associate = (models) => {
    Saving.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    });
  };

  return Saving;
};