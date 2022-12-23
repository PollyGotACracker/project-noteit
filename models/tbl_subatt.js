import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_subatt",
    {
      sa_subid: {
        type: Sequelize.STRING(125),
        allowNull: false,
      },
      sa_attid: {
        type: Sequelize.STRING(125),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_subatt",
      timestamps: false,
    }
  );
};
