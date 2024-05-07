// Create a Sequelize model
const Users = (db, DataTypes) => db.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  module.exports = Users;