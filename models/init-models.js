import _tbl_attachs from "./tbl_attachs.js";
import _tbl_categories from "./tbl_categories.js";
import _tbl_holidays from "./tbl_holidays.js";
import _tbl_keywords from "./tbl_keywords.js";
import _tbl_score from "./tbl_score.js";
import _tbl_subjects from "./tbl_subjects.js";
import _tbl_todo from "./tbl_todo.js";
import _tbl_users from "./tbl_users.js";

function initModels(sequelize) {
  const tbl_attachs = _tbl_attachs(sequelize);
  const tbl_categories = _tbl_categories(sequelize);
  const tbl_holidays = _tbl_holidays(sequelize);
  const tbl_keywords = _tbl_keywords(sequelize);
  const tbl_score = _tbl_score(sequelize);
  const tbl_subjects = _tbl_subjects(sequelize);
  const tbl_todo = _tbl_todo(sequelize);
  const tbl_users = _tbl_users(sequelize);

  tbl_subjects.belongsTo(tbl_categories, {
    as: "s_cat",
    foreignKey: "s_catid",
    onDelete: "cascade",
  });
  tbl_categories.hasMany(tbl_subjects, {
    as: "tbl_subjects",
    foreignKey: "s_catid",
    onDelete: "cascade",
  });

  tbl_keywords.belongsTo(tbl_subjects, {
    as: "k_sub",
    foreignKey: "k_subid",
    onDelete: "cascade",
  });
  tbl_subjects.hasMany(tbl_keywords, {
    as: "tbl_keywords",
    foreignKey: "k_subid",
    onDelete: "cascade",
  });

  tbl_categories.belongsTo(tbl_users, {
    as: "c_users",
    foreignKey: "c_userid",
    onDelete: "cascade",
  });
  tbl_users.hasMany(tbl_categories, {
    as: "tbl_categories",
    foreignKey: "c_userid",
    onDelete: "cascade",
  });

  tbl_score.belongsTo(tbl_users, {
    as: "sc_users",
    foreignKey: "sc_userid",
    onDelete: "cascade",
  });
  tbl_users.hasMany(tbl_score, {
    as: "tbl_scores",
    foreignKey: "sc_userid",
    onDelete: "cascade",
  });

  tbl_todo.belongsTo(tbl_users, {
    as: "t_users",
    foreignKey: "t_userid",
    onDelete: "cascade",
  });
  tbl_users.hasMany(tbl_todo, {
    as: "tbl_todo",
    foreignKey: "t_userid",
    onDelete: "cascade",
  });

  return {
    tbl_attachs,
    tbl_categories,
    tbl_holidays,
    tbl_keywords,
    tbl_score,
    tbl_subjects,
    tbl_todo,
    tbl_users,
  };
}

export default initModels;
