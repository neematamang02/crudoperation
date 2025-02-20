// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors"); // Import CORS
// const productRoute = require("./routes/product.route.js");

// const app = express();

// // Middleware
// app.use(cors()); // Allow all origins
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Routes
// app.use("/api/products", productRoute);

// app.get("/", (req, res) => {
//   res.send("Hello from Node API Server Updated");
// });

// mongoose
//   .connect("mongodb://localhost:27017/")
//   .then(() => {
//     console.log("Connected to database!");
//     app.listen(3000, () => {
//       console.log("Server is running on port 3000");
//     });
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const productRoute = require("./routes/product.route");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// Multer storage setup
const storage = multer.diskStorage({
  destination: "./uploads/", // Save files in "uploads" folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// API Routes
app.use("/api/products", productRoute);

// Test API
app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/productsdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Connection failed!", error);
  });
