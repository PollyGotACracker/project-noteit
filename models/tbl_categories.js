import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_categories",
    {
      c_catid: {
        type: Sequelize.STRING(125),
        allowNull: false,
        primaryKey: true,
      },
      c_category: {
        type: Sequelize.STRING(125),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_categories",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "c_catid" }],
        },
      ],
    }
  );
};
