import multer from "multer";

const multerUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const isAccepted = ["image/png", "image/jpg", "image/jpeg"].find((formatoAceito) => formatoAceito == file.mimetype);
    if (isAccepted) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});

export { multerUpload };

