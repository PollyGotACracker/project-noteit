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
      c_bookmark: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
      c_date: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      c_quizdate: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
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
      ],
    }
  );
};
