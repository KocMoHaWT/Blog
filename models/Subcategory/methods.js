function define(models) {
  //Get all conversation
  this.findAllWhere = async where => this.findAll({
    where,
    include: [
      { model: models.User, as: 'user' },
    ],
  });
}

module.exports = {
  define
}
