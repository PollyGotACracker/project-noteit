import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_keywords",
    {
      k_keyid: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
        primaryKey: true,
      },
      k_subid: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "tbl_subjects",
          key: "s_subid",
        },
      },
      k_index: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      k_keyword: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
      },
      k_desc: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
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
          fields: [{ name: "k_keyid" }, { name: "k_subid" }],
        },
        {
          name: "fk_subkey",
          using: "BTREE",
          fields: [{ name: "k_subid" }],
        },
      ],
    }
  );
};
