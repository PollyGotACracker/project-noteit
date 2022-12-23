import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_keywords",
    {
      k_keyid: {
        type: Sequelize.STRING(125),
        allowNull: false,
        primaryKey: true,
      },
      k_subid: {
        type: Sequelize.STRING(125),
        allowNull: false,
      },
      k_keyword: {
        type: Sequelize.STRING(225),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_keywords",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "k_keyid" }],
        },
      ],
    }
  );
};
