import multer from "multer";
import path from "path";
import fs from "fs";

// const __dirname = path.resolve();
// const fpDest = path.join(__dirname, "public/img");
const fpDest = "public/img";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // check directory exist or not , if not create one
    !fs.existsSync(fpDest) && fs.mkdirSync(fpDest, { recursive: true });
    cb(null, fpDest);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filepath = uniqueSuffix + "-" + file.originalname;
    cb(null, filepath);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedextension = /jpeg|png|jif|jpg|webp|jfif/;
  const fileextension = path.extname(file.originalname).toLowerCase();
  const isAllowedextension = allowedextension.test(fileextension);
  const mimetype = allowedextension.test(file.mimetype);

  if (isAllowedextension && mimetype) {
    cb(null, true);
  } else {
    cb(new Error(" jpeg,png if and jpg are only allowed "), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});
