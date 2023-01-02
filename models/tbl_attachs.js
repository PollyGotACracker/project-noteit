import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_attachs",
    {
      a_attid: {
        type: Sequelize.STRING(125),
        allowNull: false,
        primaryKey: true,
      },
      a_subid: {
        type: Sequelize.STRING(125),
        allowNull: false,
        references: {
          model: "tbl_subjects",
          key: "s_subid",
        },
      },
      a_date: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      a_time: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      a_original_name: {
        type: Sequelize.STRING(225),
        allowNull: false,
      },
      a_save_name: {
        type: Sequelize.STRING(225),
        allowNull: false,
      },
      a_ext: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_attachs",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "a_attid" }],
        },
        {
          name: "f_subatt",
          using: "BTREE",
          fields: [{ name: "a_subid" }],
        },
      ],
    }
  );
};
