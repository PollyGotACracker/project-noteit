import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_catsub",
    {
      cs_catid: {
        type: Sequelize.STRING(125),
        allowNull: false,
      },
      cs_subid: {
        type: Sequelize.STRING(125),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_catsub",
      timestamps: false,
    }
  );
};
