module.exports = (sequelize, DataTypes) => {
     const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
    })
     return Role;
}
