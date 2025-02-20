// import React, { useEffect, useState } from "react";
// import { CiMenuKebab } from "react-icons/ci";
// import { IoCopyOutline } from "react-icons/io5";
// import { Toaster, toast } from "react-hot-toast";

// const Display = () => {
//   const [products, setProducts] = useState([]);
//   const [dropdownVisible, setDropdownVisible] = useState(null); // Tracks which product's menu is open
//   const [showModal, setShowModal] = useState(false); // Controls modal visibility
//   const [currentProduct, setCurrentProduct] = useState(null); // Stores current product for updating

//   const notify = () => toast.success("Copied successfully");

//   // Fetch products from the backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/products");
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleCopyToClipboard = (product) => {
//     const productText = `Name: ${product.name}\nPrice: $${product.price}\nQuantity: ${product.quantity}`;
//     navigator.clipboard.writeText(productText).then(() => {
//       notify(); // Show the toast notification after copying
//     });
//   };

//   const handleDuplicate = (product) => {
//     setProducts([...products, { ...product, _id: Math.random().toString() }]);
//   };

//   // Toggle dropdown visibility for each product
//   // const toggleDropdown = (id) => {
//   //   setDropdownVisible((prev) => (prev === id ? null : id));
//   // };
//   const toggleDropdown = (id) => {
//     setDropdownVisible((prev) => ({
//       ...prev,
//       [id]: !prev[id], // Toggle the clicked product
//     }));
//   };

//   // Handle input changes for the product being updated
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//   };

//   // Update the product when the form is submitted
//   const handleUpdate = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/products/${currentProduct._id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(currentProduct),
//         }
//       );
//       if (!response.ok) throw new Error("Failed to update product");
//       const updatedProduct = await response.json();
//       setProducts((prevProducts) =>
//         prevProducts.map((product) =>
//           product._id === currentProduct._id ? updatedProduct : product
//         )
//       );
//       toast.success("Product updated successfully!");
//       setShowModal(false); // Close the modal after update
//     } catch (error) {
//       console.error("Error updating product:", error);
//       toast.error("Failed to update product");
//     }
//   };

//   // Close the modal without saving changes
//   const closeModal = () => {
//     setShowModal(false);
//     setCurrentProduct(null);
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen p-6">
//       <Toaster /> {/* Ensure the Toaster is included here */}
//       <h2 className="text-2xl font-bold mb-4">Product List</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div
//               key={product._id}
//               className="bg-white shadow-md rounded-lg p-4 relative"
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-48 object-cover rounded-lg mb-3"
//               />
//               <h3 className="text-xl font-bold">{product.name}</h3>
//               <p className="text-gray-700">Price: ${product.price}</p>
//               <p className="text-gray-700">Quantity: {product.quantity}</p>

//               {/* Menu Icon */}
//               <div className="relative inline-block">
//                 <CiMenuKebab
//                   className="cursor-pointer text-2xl mt-2"
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent bubbling issue
//                     toggleDropdown(product._id);
//                   }}
//                 />

//                 {/* Dropdown Menu (Only opens for one product at a time) */}
//                 {dropdownVisible[product._id]  && (
//                   <div className="absolute flex-col gap-4 right-0 bg-white border rounded-md shadow-lg p-2 z-10">
//                     <div className="flex ">
//                       <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
//                         Copy to Clipboard
//                       </button>
//                       <IoCopyOutline
//                         className="mt-3 cursor-pointer"
//                         onClick={() => {
//                           handleCopyToClipboard(product); // Copy to clipboard // Show the toast notification
//                         }}
//                       />
//                     </div>

//                     <button
//                       className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
//                       onClick={() => handleDuplicate(product)}
//                     >
//                       Duplicate Copy
//                     </button>

//                     <div className="updateanddeletebtn flex gap-2 mt-2">
//                       <button
//                         className="bg-green-600 text-white px-4 py-2 rounded"
//                         onClick={() => {
//                           setCurrentProduct(product); // Set current product to be updated
//                           setShowModal(true); // Show modal
//                         }}
//                       >
//                         Update
//                       </button>
//                       <button className="bg-red-600 text-white px-4 py-2 rounded">
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No products available.</p>
//         )}
//       </div>
//       {/* Modal for updating product */}
//       {showModal && currentProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-2xl font-bold mb-4">Update Product</h2>
//             <div className="flex flex-col gap-3">
//               <label>
//                 <span className="font-semibold">Name: </span>
//                 <input
//                   type="text"
//                   name="name"
//                   value={currentProduct.name}
//                   onChange={handleChange}
//                   className="border rounded p-1 ml-2"
//                 />
//               </label>
//               <label>
//                 <span className="font-semibold">Price: </span>
//                 <input
//                   type="number"
//                   name="price"
//                   value={currentProduct.price}
//                   onChange={handleChange}
//                   className="border rounded p-1 ml-2"
//                 />
//               </label>
//               <label>
//                 <span className="font-semibold">Quantity: </span>
//                 <input
//                   type="number"
//                   name="quantity"
//                   value={currentProduct.quantity}
//                   onChange={handleChange}
//                   className="border rounded p-1 ml-2"
//                 />
//               </label>
//               <label>
//                 <span className="font-semibold">Image URL: </span>
//                 <input
//                   type="text"
//                   name="image"
//                   value={currentProduct.image}
//                   onChange={handleChange}
//                   className="border rounded p-1 ml-2"
//                 />
//               </label>
//             </div>
//             <div className="flex justify-between gap-4 mt-4">
//               <button
//                 onClick={handleUpdate}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 Save Changes
//               </button>
//               <button
//                 onClick={closeModal}
//                 className="bg-gray-600 text-white px-4 py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Display;

import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5";
import { Toaster, toast } from "react-hot-toast";

const Display = () => {
  const [products, setProducts] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null); // Single ID for the open dropdown
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const notify = () => toast.success("Copied successfully");

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Copy ONLY the product ID
  const handleCopyToClipboard = (product) => {
    navigator.clipboard.writeText(product._id).then(() => {
      notify();
    });
  };

  const handleDuplicate = (product) => {
    setProducts((prev) => [
      ...prev,
      { ...product, _id: Math.random().toString() },
    ]);
  };

  // Toggle which product dropdown is active
  const toggleDropdown = (id) => {
    setActiveDropdown((prevId) => (prevId === id ? null : id));
  };

  // Handle changes in the Update Modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Update product
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${currentProduct._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentProduct),
        }
      );
      if (!response.ok) throw new Error("Failed to update product");
      const updatedProduct = await response.json();

      // Replace the old product with the updated one
      setProducts((prev) =>
        prev.map((p) => (p._id === currentProduct._id ? updatedProduct : p))
      );

      toast.success("Product updated successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  // Close the modal
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
              key={product._id}
              className="bg-white shadow-md rounded-lg p-4 relative"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-gray-700">Price: ${product.price}</p>
              <p className="text-gray-700">Quantity: {product.quantity}</p>

              {/* Kebab menu icon */}
              <div className="relative inline-block">
                <CiMenuKebab
                  className="cursor-pointer text-2xl mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(product._id);
                  }}
                />

                {/* Only show dropdown if this product is active */}
                {activeDropdown === product._id && (
                  <div className="absolute flex-col gap-4 right-0 bg-white border rounded-md shadow-lg p-2 z-10">
                    <div className="flex">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                        onClick={() => handleCopyToClipboard(product)}
                      >
                        Copy ID
                      </button>
                      <IoCopyOutline
                        className="mt-3 cursor-pointer"
                        onClick={() => handleCopyToClipboard(product)}
                      />
                    </div>

                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                      onClick={() => handleDuplicate(product)}
                    >
                      Duplicate Copy
                    </button>

                    <div className="flex gap-2 mt-2">
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        onClick={() => {
                          setCurrentProduct(product);
                          setShowModal(true);
                        }}
                      >
                        Update
                      </button>
                      <button className="bg-red-600 text-white px-4 py-2 rounded">
                        Delete
                      </button>
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

      {/* Modal for updating product */}
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

export default Display;
