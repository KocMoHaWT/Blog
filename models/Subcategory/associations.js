function define(models) {
  this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category'});
}

module.exports = {
  define
}
