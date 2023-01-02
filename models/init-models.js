import _tbl_attachs from "./tbl_attachs.js";
import _tbl_categories from "./tbl_categories.js";
import _tbl_keywords from "./tbl_keywords.js";
import _tbl_subjects from "./tbl_subjects.js";

const initModels = (sequelize) => {
  const tbl_attachs = _tbl_attachs(sequelize);
  const tbl_categories = _tbl_categories(sequelize);
  const tbl_keywords = _tbl_keywords(sequelize);
  const tbl_subjects = _tbl_subjects(sequelize);

  tbl_subjects.belongsTo(tbl_categories, {
    as: "f_cat",
    foreignKey: "s_catid",
  });
  tbl_categories.hasMany(tbl_subjects, {
    as: "f_sub",
    foreignKey: "s_catid",
  });
  tbl_attachs.belongsTo(tbl_subjects, { as: "f_sub", foreignKey: "a_subid" });
  tbl_subjects.hasMany(tbl_attachs, {
    as: "f_att",
    foreignKey: "a_subid",
  });
  tbl_keywords.belongsTo(tbl_subjects, { as: "f_sub", foreignKey: "k_subid" });
  tbl_subjects.hasMany(tbl_keywords, {
    as: "f_key",
    foreignKey: "k_subid",
  });

  return {
    tbl_attachs,
    tbl_categories,
    tbl_keywords,
    tbl_subjects,
  };
};

export default initModels;
