import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_notifications",
    {
      n_notid: {
        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      n_userid: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
      },
      n_hour: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        validate: {
          checkHour(num) {
            if (num < 0 || num > 24) {
              throw new Error("값은 0 이상 23 이하여야 합니다.");
            }
          },
        },
      },
      n_endpoint: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      n_authkey: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
      },
      n_p256dhkey: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_notifications",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "n_notid" }],
        },
      ],
    }
  );
};
