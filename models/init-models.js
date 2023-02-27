import _tbl_attachs from "./tbl_attachs.js";
import _tbl_categories from "./tbl_categories.js";
import _tbl_holidays from "./tbl_holidays.js";
import _tbl_keywords from "./tbl_keywords.js";
import _tbl_score from "./tbl_score.js";
import _tbl_subjects from "./tbl_subjects.js";
import _tbl_user from "./tbl_user.js";

const initModels = (sequelize) => {
  const tbl_attachs = _tbl_attachs(sequelize);
  const tbl_categories = _tbl_categories(sequelize);
  const tbl_holidays = _tbl_holidays(sequelize);
  const tbl_keywords = _tbl_keywords(sequelize);
  const tbl_score = _tbl_score(sequelize);
  const tbl_subjects = _tbl_subjects(sequelize);
  const tbl_user = _tbl_user(sequelize);

  tbl_score.belongsTo(tbl_categories, { as: "sc_cat", foreignKey: "sc_catid" });
  tbl_categories.hasMany(tbl_score, {
    as: "tbl_scores",
    foreignKey: "sc_catid",
  });
  tbl_subjects.belongsTo(tbl_categories, {
    as: "s_cat",
    foreignKey: "s_catid",
  });
  tbl_categories.hasMany(tbl_subjects, {
    as: "tbl_subjects",
    foreignKey: "s_catid",
  });
  tbl_attachs.belongsTo(tbl_subjects, { as: "a_sub", foreignKey: "a_subid" });
  tbl_subjects.hasMany(tbl_attachs, {
    as: "tbl_attaches",
    foreignKey: "a_subid",
  });
  tbl_keywords.belongsTo(tbl_subjects, { as: "k_sub", foreignKey: "k_subid" });
  tbl_subjects.hasMany(tbl_keywords, {
    as: "tbl_keywords",
    foreignKey: "k_subid",
  });
  // tbl_categories.belongsTo(tbl_user, { as: "c_user", foreignKey: "c_userid" });
  // tbl_user.hasMany(tbl_categories, {
  //   as: "tbl_categories",
  //   foreignKey: "c_userid",
  // });
  tbl_score.belongsTo(tbl_user, { as: "sc_user", foreignKey: "sc_userid" });
  tbl_user.hasMany(tbl_score, { as: "tbl_scores", foreignKey: "sc_userid" });

  return {
    tbl_attachs,
    tbl_categories,
    tbl_holidays,
    tbl_keywords,
    tbl_score,
    tbl_subjects,
    tbl_user,
  };
};

export default initModels;
