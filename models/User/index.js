module.exports = (sequelize, DataTypes) => sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
  },
  password: {
    type: DataTypes.STRING(255),
    // set(value) {
      // this.setDataValue('password', hash(value));
    // }
  },
  role_id: {
    type: DataTypes.INTEGER,
  },
  avatar: {
    type: DataTypes.STRING(255),
  }
}, {
  timestamps: true,
  onUpdate: true,
  tableName: 'Users',
  underscored: true,
  freezeTableName: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
