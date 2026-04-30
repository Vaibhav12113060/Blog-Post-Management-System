import * as Yup from "yup";

// Auth Validation
export const authSchema = Yup.object().shape({
  name: Yup.string().when("isRegister", {
    is: true,
    then: (schema) => schema.required("Name is required"),
  }),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

// Blog Validation (Matches your Mongoose Schema)
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
const FILE_SIZE = 2 * 1024 * 1024; // 2MB Limit

export const blogSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .required("Title is required"),
  category: Yup.string()
    .oneOf(
      ["Technology", "Business", "Lifestyle", "Design", "Other"],
      "Invalid Category",
    )
    .required("Please select a category"),
  status: Yup.string()
    .oneOf(["Draft", "Published"], "Invalid Status")
    .required("Please select a status"),
  shortDescription: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Short description is required"),
  content: Yup.string().required("Blog content is required"),

  // ✅ Thumbnail Validation added
  thumbnail: Yup.mixed()
    .test(
      "fileFormat",
      "Unsupported Format! Only JPG, JPEG, PNG, WEBP, and GIF are allowed.",
      (value) => {
        if (!value || typeof value === "string") return true; // Allow no file or existing URL
        return value && SUPPORTED_FORMATS.includes(value.type);
      },
    )
    .test("fileSize", "File is too large! Maximum limit is 2MB.", (value) => {
      if (!value || typeof value === "string") return true; // Allow no file or existing URL
      return value && value.size <= FILE_SIZE;
    }),
});
