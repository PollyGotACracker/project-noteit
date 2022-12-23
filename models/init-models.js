import _tbl_subjects from "./tbl_subjects.js";
import _tbl_categories from "./tbl_categories.js";
import _tbl_keywords from "./tbl_keywords.js";
import _tbl_attatchs from "./tbl_attatchs.js";
import _tbl_catsub from "./tbl_catsub.js";
import _tbl_subkey from "./tbl_subkey.js";
import _tbl_subatt from "./tbl_subatt.js";

const initModels = (sequelize) => {
  const tbl_subjects = _tbl_subjects(sequelize);
  const tbl_categories = _tbl_categories(sequelize);
  const tbl_keywords = _tbl_keywords(sequelize);
  const tbl_attatchs = _tbl_attatchs(sequelize);
  const tbl_catsub = _tbl_catsub(sequelize);
  const tbl_subkey = _tbl_subkey(sequelize);
  const tbl_subatt = _tbl_subatt(sequelize);

  return {
    tbl_subjects,
    tbl_categories,
    tbl_keywords,
    tbl_attatchs,
    tbl_catsub,
    tbl_subkey,
    tbl_subatt,
  };
};

export default initModels;
