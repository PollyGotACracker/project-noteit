import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_todo",
    {
      t_todoid: {
        autoIncrement: true,
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      t_userid: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
        primaryKey: true,
      },
      t_date: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      t_time: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      t_content: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
      },
      t_deadline: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
      },
      t_prior: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 5,
      },
      t_compdate: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
      },
      t_comptime: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "tbl_todo",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "t_todoid" }, { name: "t_userid" }],
        },
      ],
    }
  );
};
