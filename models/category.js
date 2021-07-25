module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('categories', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
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
  
  Category.associate = (models) => {
    Category.hasMany(models.Expense, {
      foreignKey: 'categoryId'
    });
    Category.hasMany(models.Income, {
      foreignKey: 'categoryId'
    });
  };

  return Category;
};