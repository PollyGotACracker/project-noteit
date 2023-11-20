import dotenv from "dotenv";

dotenv.config();

export const VAPID_KEYS = {
  public: process.env.VAPID_PUBLIC_KEY,
  private: process.env.VAPID_PRIVATE_KEY,
};
