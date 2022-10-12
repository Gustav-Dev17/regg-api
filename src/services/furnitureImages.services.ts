import {IFurnitureImages, IRequestFurnitureImagesBody} from "types/furnitureImages.body.types";
import {
    CreateFurnitureImagesRepo,
    DeleteFurnitureImage,
    ReadFurnitureImageByAltname,
    ReadFurnitureImageById, ReadFurnitureImages,
    UpdateFurnitureImage,
} from "repositories/furnitureImages.repository";
import fs from "fs";
import {promisify} from "util";

export const UploadFurnitureImages = async (body: IFurnitureImages) => {
    try {
        const altname = await ReadFurnitureImageByAltname(body.image_altname);
        if (altname) {
            throw new Error("Altname already exists");
        }
        return CreateFurnitureImagesRepo(body);
    } catch (e) {
        throw new Error((e as Error).message);
    }
};

export const ReadFurnitureImageId = (id: string) => {
    try {
        return ReadFurnitureImageById(id);
    } catch (e) {
        throw new Error((e as Error).message);
    }
};

export const ReadAllFurnitureImages = () => {
    try {
        return ReadFurnitureImages();
    } catch (e) {
        throw new Error((e as Error).message);
    }
}

export const UpdateFurnitureImages = async (body: IRequestFurnitureImagesBody, id: string) => {
    try {
        const image = await ReadFurnitureImageById(id);

        if (body.image_path) {
            fs.unlinkSync(`${image?.image_path.slice(1)}`);
        }

        const image_altname = body.image_altname || image?.image_altname;
        const image_path = `/${body.image_path}` || image?.image_path;

        return UpdateFurnitureImage({image_altname, image_path}, id);
    } catch (e) {
        throw new Error((e as Error).message);
    }
};

export const DeleteFurnitureImages = async (id: string) => {
    try {
        const image = await ReadFurnitureImageById(id);
        fs.unlinkSync(`${image?.image_path.slice(1)}`);

        return DeleteFurnitureImage(id);
    } catch (e) {
        throw new Error((e as Error).message);
    }
};
