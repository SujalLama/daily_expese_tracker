module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define('incomes', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
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
      },
      creator: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  }, {timestamps: false});
 

    Income.associate = (models) => {
    Income.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    });
    Income.belongsTo(models.User, {
      foreignKey: 'creator'
    })
  };

  return Income;
};