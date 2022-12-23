import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_subkey",
    {
      sk_subid: {
        type: Sequelize.STRING(125),
        allowNull: false,
      },
      sk_keyid: {
        type: Sequelize.STRING(125),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_subkey",
      timestamps: false,
    }
  );
};
