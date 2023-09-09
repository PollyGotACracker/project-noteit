import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_holidays",
    {
      h_datename: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      h_isholiday: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      h_locdate: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "tbl_holidays",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "h_locdate" }],
        },
      ],
    }
  );
};
