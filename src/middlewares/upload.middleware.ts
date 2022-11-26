import { NextFunction, Request, Response } from "express";
import { bucket } from "../firebase/config";

export const UploadMiddleware = async (req: Request, __: Response, next: NextFunction) => {
  if (!req.file) return next();
  const image = req.file;
  const name = Date.now() + "-" + image.originalname.split(".").pop();
  const file = bucket.file(name);
  const stream = file.createWriteStream({ metadata: { contentType: image.mimetype } });

  stream.on("error", (e) => {
    console.error(e);
  });

  stream.on("finish", async () => {
    await file.makePublic();

    req.firebaseUrl = `https://storage.googleapis.com/regg-86e2b.appspot.com/${name}`;
    next();
  });

  stream.end(image.buffer);
};

