import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now());
  },
});

const fileFilter = (req, file, cb) => {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  } else {
    cb(null, true);
  }

  // Allowed file types
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
export default upload;
