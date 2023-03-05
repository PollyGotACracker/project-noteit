import { Op } from "sequelize";
import DB from "../models/index.js";
import moment from "moment";
import fs from "fs";
import path from "path";

const SUB = DB.models.tbl_subjects;
const ATT = DB.models.tbl_attachs;

export const removeAttach = async () => {
  // 테스트용 코드
  // const today = moment().format("YYYY-MM-DD");
  const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
  const uploadDir = path.join("public/uploads");

  // 하루동안 update(default 이므로 create 도 포함됨) 된 모든 sub 를 raw 로 select
  const subs = await SUB.findAll({
    raw: true,
    attributes: ["s_subid", "s_attachs"],
    // 날짜 형식에서 Op.like 와 % 를 사용하면 원하는 결과가 나오지 않음
    where: { s_date: { [Op.startsWith]: `${yesterday}` } },
  });

  // map 을 사용하여 각 sub 에서 미사용된(업로드 O, 게시 X) attachment 삭제
  await subs?.map(async (item) => {
    // attachs: sub 의 s_attachs 에 없는 attach 목록
    // cf) comma 를 구분자로 하여 split 하면 각 문자열 요소를 갖는 배열 반환
    // 해당 문자열에 구분자가 없을 경우 문자열 요소 한 개를 갖는 배열 반환
    const attachs = await ATT?.findAll({
      raw: true,
      where: {
        [Op.and]: [
          { a_subid: `${item.s_subid}` },
          { a_savename: { [Op.notIn]: item.s_attachs.split(",") } },
        ],
      },
    });
    // 각 attach 마다 db 데이터 및 실제 업로드 파일 삭제
    await attachs?.map(async (item) => {
      try {
        const delFile = path.join(uploadDir, item.a_savename);
        fs.statSync(delFile);
        fs.unlinkSync(delFile);
      } catch (err) {
        console.error;
        console.log(item.a_savename, "uploads 에서 파일을 찾을 수 없음");
      }
      await ATT.destroy({ where: { a_code: item.a_attid } });
    });
  });
};
