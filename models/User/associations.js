function define(models) {
  this.belongsTo(models.Role, {foreignKey: 'role_id', as: 'role'});
  this.hasMany(models.Post, {foreignKey: 'id', as: 'posts'});
}

module.exports =  {
  define
}
