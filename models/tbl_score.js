import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_score",
    {
      sc_scoid: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
        primaryKey: true,
      },
      sc_userid: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
        references: {
          model: "tbl_users",
          key: "u_userid",
        },
      },
      sc_date: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      sc_catid: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
        references: {
          model: "tbl_categories",
          key: "c_catid",
        },
      },
      sc_category: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      sc_score: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_score",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "sc_scoid" }],
        },
        {
          name: "fk_usesco",
          using: "BTREE",
          fields: [{ name: "sc_userid" }],
        },
        {
          name: "fk_catsco",
          using: "BTREE",
          fields: [{ name: "sc_catid" }],
        },
      ],
    }
  );
};
