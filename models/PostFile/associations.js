function define(models) {
  this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post'});
}

module.exports = {
  define
}
