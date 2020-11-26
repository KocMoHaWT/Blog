module.exports = (sequelize, DataTypes) => sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    korgi_like: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
  timestamps: true,
  tableName: 'comments',
  underscored: true,
  freezeTableName: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});
