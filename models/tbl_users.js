import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_users",
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
        unique: "u_nickname",
      },
      u_profileimg: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: true,
      },
      u_profilestr: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: true,
      },
      u_cscore: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      u_darkmode: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "tbl_users",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "u_userid" }],
        },
        {
          name: "u_nickname",
          unique: true,
          using: "BTREE",
          fields: [{ name: "u_nickname" }],
        },
      ],
    }
  );
};
