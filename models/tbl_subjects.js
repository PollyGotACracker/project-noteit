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
        type: Sequelize.TINYINT(1),
        allowNull: false,
        default: 0,
      },
      s_keyid: {
        type: Sequelize.STRING(125),
        allowNull: false,
      },
      s_content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      s_attid: {
        type: Sequelize.STRING(125),
        allowNull: false,
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
      ],
    }
  );
};
