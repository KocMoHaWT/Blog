function define(models) {
  this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
  this.hasMany(models.PostFile, { foreignKey: 'id', as: 'postFiles'})
}

module.exports = {
  define
}
