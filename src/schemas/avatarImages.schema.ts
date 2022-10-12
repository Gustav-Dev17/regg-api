import * as yup from "yup";

export const avatarImagesSchema = yup.object().shape({
    avatar_path: yup.string().min(100, "Provide the avatar path").required("Avatar path is required"),
    userId: yup.string().min(50, "Provide the user ID").required("User ID is required"),
})