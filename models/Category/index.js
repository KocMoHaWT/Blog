module.exports = (sequelize, DataTypes) => sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
  },
  }, {
  timestamps: true,
  tableName: 'categories',
  underscored: true,
  freezeTableName: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});
