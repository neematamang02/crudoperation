const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

// Configure Multer for Image Uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// CRUD Routes
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", upload.single("image"), createProduct); // Now supports image upload
router.put("/:id", upload.single("image"), updateProduct); // Optional: allow image updates
router.delete("/:id", deleteProduct);

module.exports = router;
