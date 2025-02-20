// const Product = require("../models/product.model");

// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }; // ORM: Object Relation Mapping

// const getProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const createProduct = async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findByIdAndUpdate(id, req.body);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     const updatedProduct = await Product.findById(id);
//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findByIdAndDelete(id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   getProducts,
//   getProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// };
const Product = require("../models/product.model");

// Get all products (transform _id to id)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    const transformedProducts = products.map((product) => ({
      id: product._id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      image: product.image,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));
    res.status(200).json(transformedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by id
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const transformedProduct = {
      id: product._id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      image: product.image,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    res.status(200).json(transformedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    const transformedProduct = {
      id: product._id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      image: product.image,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
    res.status(200).json(transformedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product by id
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // The { new: true } option returns the updated document
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const transformedProduct = {
      id: product._id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      image: product.image,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    res.status(200).json(transformedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product by id
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
