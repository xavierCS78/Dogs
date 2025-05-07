const { DataTypes } = require("sequelize");
// Modelo de las razas de los perros
module.exports = (sequelize) => {
  sequelize.define(
    "Raza",
    {
      ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Altura: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Peso: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Años: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );
};
