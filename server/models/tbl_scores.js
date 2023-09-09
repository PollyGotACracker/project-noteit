import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_scores",
    {
      sc_scoid: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
        primaryKey: true,
      },
      sc_userid: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: false,
      },
      sc_date: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      sc_time: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      sc_duration: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      sc_catid: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      sc_category: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      sc_score: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      sc_totalscore: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_scores",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "sc_scoid" }],
        },
      ],
    }
  );
};
