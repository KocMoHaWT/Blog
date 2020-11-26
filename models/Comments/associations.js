function define(models) {
  this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post'});
  this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});

}

module.exports = {
  define
}
