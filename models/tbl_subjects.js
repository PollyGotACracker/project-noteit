import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_subjects",
    {
      s_subid: {
        type: Sequelize.STRING(125),
        allowNull: false,
        primaryKey: true,
      },
      s_subject: {
        type: Sequelize.STRING(125),
        allowNull: false,
      },
      s_catid: {
        type: Sequelize.STRING(125),
        allowNull: false,
        references: {
          model: "tbl_categories",
          key: "c_catid",
        },
      },
      s_category: {
        type: Sequelize.STRING(125),
        allowNull: false,
      },
      s_date: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      s_time: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      s_bookmark: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
      s_content: {
        type: Sequelize.TEXT,
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
          fields: [{ name: "s_subid" }],
        },
        {
          name: "f_catsub",
          using: "BTREE",
          fields: [{ name: "s_catid" }],
        },
      ],
    }
  );
};
