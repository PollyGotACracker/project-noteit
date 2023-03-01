import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_subjects",
    {
      s_subid: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
        primaryKey: true,
      },
      s_subject: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      s_catid: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "tbl_categories",
          key: "c_catid",
        },
      },
      s_category: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      s_date: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
      },
      s_time: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
      },
      s_views: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
      },
      s_bookmark: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
      s_content: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "tbl_subjects",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "s_subid" }, { name: "s_catid" }],
        },
        {
          name: "fk_catsub",
          using: "BTREE",
          fields: [{ name: "s_catid" }],
        },
      ],
    }
  );
};
