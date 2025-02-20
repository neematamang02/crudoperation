import React, { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { IoCopyOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { IoDuplicateOutline } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiEditCircleLine } from "react-icons/ri";
import { useOutSideClick } from "../hook/useOutSideClick";

const baseurl = "http://localhost:3000/api/products";

const ProductManage = () => {
  const [products, setProducts] = useState([]);
  // Use the product id of the open dropdown
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const notify = () => toast.success("Copied successfully");

  // Create a ref for the active dropdown container
  const dropdownRef = useRef(null);

  // Apply the outside click hook to the active dropdown only.
  useOutSideClick(dropdownRef, () => {
    handleMenuClose();
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(baseurl);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Toggle dropdown using product id.
  const handleMenuOpen = (e, product) => {
    e.stopPropagation();
    if (activeDropdown === product.id) {
      handleMenuClose();
    } else {
      setActiveDropdown(product.id);
      setSelectedProduct(product);
    }
  };

  const handleMenuClose = () => {
    setActiveDropdown(null);
    setSelectedProduct(null);
  };

  const handleCopyToClipboard = () => {
    if (selectedProduct) {
      navigator.clipboard.writeText(`${selectedProduct.id}`);
      notify();
    }
    handleMenuClose();
  };

  const handleDuplicateProduct = () => {
    if (selectedProduct) {
      setProducts([...products, { ...selectedProduct, id: Date.now() }]);
    }
    handleMenuClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdate = async () => {
    try {
      // Use either _id or id
      const id = currentProduct._id || currentProduct.id;
      const response = await fetch(`${baseurl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentProduct),
      });
      if (!response.ok) throw new Error("Failed to update product");
      const updatedProduct = await response.json();

      setProducts((prev) =>
        prev.map((p) => ((p._id || p.id) === id ? updatedProduct : p))
      );
      toast.success("Product updated successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const id = selectedProduct.id;
      const response = await fetch(`${baseurl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete product");
      setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      handleMenuClose();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id || product._id}
              className="border p-4 rounded-lg shadow-md relative"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg mb-3"
              />
              <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
              <p>Quantity: {product.quantity}</p>
              <p>Price: ${product.price}</p>

              {/* Button and dropdown container */}
              <div className="relative inline-block">
                <button
                  onClick={(e) => handleMenuOpen(e, product)}
                  className="mt-2"
                >
                  <CiMenuKebab />
                </button>
                {activeDropdown === product.id &&
                  selectedProduct?.id === product.id && (
                    // Attach the ref to the active dropdown only
                    <div
                      ref={dropdownRef}
                      className="absolute mt-2 w-auto flex flex-col gap-1 bg-white border rounded-lg shadow-md p-3"
                    >
                      <div
                        className="flex gap-4 justify-between hover:bg-gray-200 p-3 rounded-lg cursor-pointer duration-200 ease-out"
                        onClick={handleCopyToClipboard}
                      >
                        <p>Copy ID</p>
                        <IoCopyOutline className="cursor-pointer mt-1" />
                      </div>
                      <div
                        className="flex gap-4 justify-between hover:bg-gray-200 p-3 rounded-lg cursor-pointer duration-200 ease-out"
                        onClick={handleDuplicateProduct}
                      >
                        <p>Duplicate</p>
                        <IoDuplicateOutline className="cursor-pointer mt-1" />
                      </div>
                      <div
                        className="flex gap-4 justify-between hover:bg-gray-200 p-3 rounded-lg cursor-pointer duration-200 ease-out"
                        onClick={() => {
                          setCurrentProduct(product);
                          setShowModal(true);
                        }}
                      >
                        <p>Edit</p>
                        <RiEditCircleLine className="cursor-pointer mt-1" />
                      </div>
                      <div
                        className="flex gap-4 justify-between hover:bg-gray-200 p-3 rounded-lg cursor-pointer duration-200 ease-out"
                        onClick={handleDeleteProduct}
                      >
                        <p>Delete</p>
                        <AiTwotoneDelete className="cursor-pointer mt-1" />
                      </div>
                    </div>
                  )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products available.</p>
        )}
      </div>
      {showModal && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>
            <div className="flex flex-col gap-3">
              <label>
                <span className="font-semibold">Name: </span>
                <input
                  type="text"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleChange}
                  className="border rounded p-1 ml-2"
                />
              </label>
              <label>
                <span className="font-semibold">Price: </span>
                <input
                  type="number"
                  name="price"
                  value={currentProduct.price}
                  onChange={handleChange}
                  className="border rounded p-1 ml-2"
                />
              </label>
              <label>
                <span className="font-semibold">Quantity: </span>
                <input
                  type="number"
                  name="quantity"
                  value={currentProduct.quantity}
                  onChange={handleChange}
                  className="border rounded p-1 ml-2"
                />
              </label>
              <label>
                <span className="font-semibold">Image URL: </span>
                <input
                  type="text"
                  name="image"
                  value={currentProduct.image}
                  onChange={handleChange}
                  className="border rounded p-1 ml-2"
                />
              </label>
            </div>
            <div className="flex justify-between gap-4 mt-4">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManage;
