module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('expenses', {
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
 

    Expense.associate = (models) => {
    Expense.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    });
    Expense.belongsTo(models.User, {
      foreignKey: 'creator'
    })
  };

  return Expense;
};