import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_user",
    {
      u_userid: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
        primaryKey: true,
      },
      u_pwd: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
      },
      u_nickname: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
      },
      u_date: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
      u_cscore: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      u_bgm: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
      u_mode: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "tbl_user",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "u_userid" }],
        },
      ],
    }
  );
};
