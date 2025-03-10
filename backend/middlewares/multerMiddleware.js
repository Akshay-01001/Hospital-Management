import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads/profile-pic");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const uploadProfilePic = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 },
}).single("image");

export {uploadProfilePic}