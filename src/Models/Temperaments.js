const { DataTypes } = require("sequelize");
// Modelo para alojar los temperamentos de los perros
module.exports = (sequelize) => {
  sequelize.define(
    "Temp",
    {
      ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { freezeTableName: true }
  );
};
