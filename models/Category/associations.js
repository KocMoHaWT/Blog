function define(models) {
  this.hasMany(models.Subcategory, { foreignKey: 'id', as: 'subcategories'});
}

module.exports = {
  define
}
