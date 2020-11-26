module.exports = (sequelize, DataTypes) => sequelize.define('PostFile', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  link: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  post_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  }
}, {
  timestamps: true,
  tableName: 'post_files',
  underscored: true,
  freezeTableName: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});
