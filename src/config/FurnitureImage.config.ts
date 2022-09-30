import multer from "multer";
import fs from "fs";

class Upload {
  private url = "./furniture-images";

  private storage(): multer.StorageEngine {
    return multer.diskStorage({
      destination: async (request, file, callback) => {
        if (!fs.existsSync(this.url)) {
          fs.mkdirSync(this.url);
        }
        callback(null, this.url);
      },
      filename: (request, file, callback) => {
        callback(null, `${Date.now()}_${file.originalname}`);
      },
    });
  }

  get getConfig(): multer.Options {
    return {
      storage: this.storage(),
      limits: {
        fileSize: 10485760,
      },
    };
  }
}

export const uploadFurnitureImages = new Upload();
