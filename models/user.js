
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
  }, {timestamps: true})

  User.associate = (models) => {
    User.hasOne(models.Role, {
      foreignKey: 'role_id',
    });
  };

  return User;
}
