import { VAPID_KEYS } from "../config/web_push_config.js";
import DB from "../models/index.js";
import dotenv from "dotenv";
import webpush from "web-push";

const NOTI = DB.models.tbl_notifications;
const USER = DB.models.tbl_users;

dotenv.config();

// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys.publicKey);
// console.log(vapidKeys.privateKey);

webpush.setVapidDetails(
  `mailto:${process.env.EMAIL_AUTH_USER}`,
  VAPID_KEYS.public,
  VAPID_KEYS.private
);

export const sendWebPush = async () => {
  const currentHour = new Date().getHours();
  const pushList = await NOTI.findAll({ where: { n_hour: currentHour } });

  if (pushList.length === 0) return;

  await DB.sequelize.transaction(async () => {
    for (let item of pushList) {
      const pushSubscription = {
        endpoint: item.n_endpoint,
        keys: {
          auth: item.n_authkey,
          p256dh: item.n_p256dhkey,
        },
      };
      const user = await USER.findByPk(item.n_userid);
      const title = "공부할 시간이에요!";
      const body = `${user.u_nickname} 님!\n이 알림을 클릭해 NoteIT 에서 오늘 공부를 시작해보세요!`;
      const url =
        process.env.NODE_ENV === "production"
          ? `https://${process.env.PRODUCTION_DOMAIN}`
          : "http://localhost:5173";
      const payload = JSON.stringify({ title, body, url });
      webpush.sendNotification(pushSubscription, payload);
    }
  });
};
