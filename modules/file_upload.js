import multer from "multer";
import fs from "fs";
import path from "path";
import { v4 } from "uuid";

const upload_dir = path.join("public/uploads");

const storageOption = {
  filename: (req, file, cb) => {
    const uuidPrefix = v4();
    const newFileName = Buffer.from(
      `${uuidPrefix}-${file.originalname}`,
      "latin1"
    ).toString("utf8");
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    const uploadFileName = newFileName.substring(newFileName.length - 255);
    cb(null, uploadFileName);
  },
  distination: (req, file, cb) => {
    if (!fs.existsSync(upload_dir)) {
      fs.mkdirSync(upload_dir, { recursive: true });
    }
    cb(null, upload_dir);
  },
};

const storage = multer.diskStorage(storageOption);

export default multer({ storage });
