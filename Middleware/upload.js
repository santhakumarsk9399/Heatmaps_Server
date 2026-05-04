// middleware/upload.js
// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: "uploads/",
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// module.exports = multer({ storage });

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "heatmaps",
        allowed_formats: ["jpg", "png", "jpeg"],
        transformation: [
            { quality: "auto" },
            { fetch_format: "auto" }
          ]
    },
});

const upload = multer({ storage });

module.exports = upload;

