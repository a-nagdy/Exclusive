import multer from "multer";
import path from "path";

// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "media/"); // Path to save files
  },
  filename: (req, file, cb) => {
    const productName = req.body.name.replace(/\s+/g, "_"); // Replace spaces with underscores
    const extension = path.extname(file.originalname); // Get file extension

    // Log for debugging
    console.log("Request Files:", req.files);
    console.log("Request Body:", req.body);
    console.log("Request file:", file);

    // Create new filename using the product name and original file name with extension
    const newFileName = `${file.originalname}_${productName}${extension}`; // Save as <originalFileName>_<productName>.<extension>

    cb(null, newFileName);
  },
});

// Initialize multer
const upload = multer({ storage });

// Export multer with fields configuration
export const uploadFields = upload.fields([
  { name: "photo", maxCount: 1 }, // Main image
  { name: "galleryImages", maxCount: 8 }, // Gallery images
]);
