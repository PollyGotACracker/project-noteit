import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_attachs",
    {
      a_attid: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
        primaryKey: true,
      },
      a_subid: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: true,
      },
      a_date: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      a_time: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      a_originalname: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
      },
      a_savename: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
      },
      a_ext: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_attachs",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "a_attid" }],
        },
      ],
    }
  );
};
