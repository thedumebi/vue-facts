/**
 * @typedef {import ("sequelize").Sequelize} Sequelize
 * @typedef {import ("sequelize").DataTypes} DataTypes
 *
 */

/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns
 */
export default (sequelize, DataTypes) => {
  const Cat = sequelize.define(
    "Cats",
    {
      _id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      status: DataTypes.JSON,
      user: DataTypes.STRING,
      text: DataTypes.STRING,
      _v: DataTypes.INTEGER,
      source: DataTypes.STRING,
      updatedAt: DataTypes.STRING,
      type: DataTypes.STRING,
      createdAt: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN,
      used: DataTypes.BOOLEAN,
    },
    { sequelize, tableName: "Cats", underscored: false, timestamps: false }
  );

  Cat.associate = function (models) {};

  return Cat;
};
