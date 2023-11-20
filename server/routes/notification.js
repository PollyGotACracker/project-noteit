import express from "express";
import { Op } from "sequelize";
import { VAPID_KEYS } from "../config/web_push_config.js";
import { verifyToken } from "../modules/user_token.js";
import DB from "../models/index.js";

const NOTI = DB.models.tbl_notifications;
const router = express.Router();

router.post("/get", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const endpoint = req.body.subscription?.endpoint;
    let info = null;
    if (endpoint) {
      info = await NOTI.findAll({
        attributes: { exclude: ["n_notid"] },
        where: { [Op.and]: [{ n_userid: userid }, { n_endpoint: endpoint }] },
      });
      info = info[0];
    }
    return res.json({
      info,
      vapidPublicKey: VAPID_KEYS.public,
    });
  } catch (err) {
    return next(err);
  }
});

router.post("/set", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const {
      subscription: {
        endpoint,
        keys: { p256dh, auth },
      },
      n_hour,
    } = req.body;

    const data = {
      n_userid: userid,
      n_endpoint: endpoint,
      n_p256dhkey: p256dh,
      n_authkey: auth,
      n_hour: Number(n_hour),
    };
    const existed = await NOTI.findAll({
      where: { [Op.and]: [{ n_userid: userid }, { n_endpoint: endpoint }] },
    });
    if (existed.length === 0) {
      await NOTI.create(data);
    } else {
      await NOTI.update(
        {
          n_hour: data.n_hour,
        },
        {
          where: { [Op.and]: [{ n_userid: userid }, { n_endpoint: endpoint }] },
        }
      );
    }
    return res.json({ message: "정상적으로 알림 설정되었습니다." });
  } catch (err) {
    return next(err);
  }
});

router.post("/delete", verifyToken, async (req, res, next) => {
  try {
    const userid = req.payload.email;
    const {
      subscription: { endpoint },
    } = req.body;

    await NOTI.destroy({
      where: { [Op.and]: [{ n_userid: userid }, { n_endpoint: endpoint }] },
    });
    return res.json({ message: "알림 설정이 해제되었습니다." });
  } catch (err) {
    return next(err);
  }
});

export default router;
