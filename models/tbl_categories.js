import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_categories",
    {
      c_catid: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
        primaryKey: true,
      },
      c_userid: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "tbl_users",
          key: "u_userid",
        },
      },
      c_category: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
        unique: "c_category",
      },
      c_subcount: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      c_checked: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
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
          fields: [{ name: "c_catid" }, { name: "c_userid" }],
        },
        {
          name: "c_category",
          unique: true,
          using: "BTREE",
          fields: [{ name: "c_category" }],
        },
        {
          name: "fk_usecat",
          using: "BTREE",
          fields: [{ name: "c_userid" }],
        },
      ],
    }
  );
};
