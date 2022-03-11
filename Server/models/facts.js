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
  const Fact = sequelize.define(
    "Facts",
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
    { sequelize, tableName: "Facts", underscored: false, timestamps: false }
  );

  Fact.associate = function (models) {};

  return Fact;
};
