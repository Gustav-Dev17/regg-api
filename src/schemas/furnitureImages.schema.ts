import * as yup from "yup";

export const furnitureImagesSchema = yup.object().shape({
  image_altname: yup.string().min(50, "Provide the right image altname for accessbility reasons, at least 50 characters").required("Image Altname is required"),
  image_path: yup.string().min(100, "Provide the image name for path").required("Image path is required"),
});
