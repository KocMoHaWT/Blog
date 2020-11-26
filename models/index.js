const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const db = {};
const modelsExtensionsMap = [];

const sequelize = new Sequelize('blog', 'root', 'root', {
  // host: 'db',
  host: '127.0.0.1',
  port: '3306',
  dialect: 'mysql'
});


fs
  .readdirSync(__dirname, { withFileTypes: true })
  .filter(file => file && file.isDirectory())
  .forEach(directory => {
    const model = require(path.join(__dirname, directory.name))(
      sequelize, Sequelize
    );
    db[model.name] = model;
    modelsExtensionsMap[model.name] = [
      path.join(`${__dirname}/`, directory.name, 'associations.js'),
      path.join(`${__dirname}/`, directory.name, 'methods.js'),
    ]
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

Object.keys(db).forEach(databaseName => {
  Object.keys(modelsExtensionsMap).forEach(modelName => {
    modelsExtensionsMap[modelName].forEach(methodPath => {
      if (!fs.existsSync(methodPath)) {
        return;
      }
      const extension = require(methodPath);
      if (!extension.define) {
        return;
      }
      if (Object.keys(db[databaseName]).includes(modelName)) {
        extension.define.call(db[databaseName][modelName], Object.assign(db.sequelize.models, db[databaseName.models]));
      }
    })
  });
})



module.exports = db;
