// import React, { useEffect, useState } from 'react';

// const baseurl = "http://localhost:3000/api/products";

// const UpdateAndDelete = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(baseurl);
//         if (!response.ok) throw new Error('Failed to fetch products');
//         setProducts(await response.json());
//       } catch (error) {
//         console.error(error.message);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleChange = (e, id) => {
//     const { name, value } = e.target;
//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product.id === id ? { ...product, [name]: value } : product
//       )
//     );
//   };

//   const handleUpdate = async (id) => {
//     try {
//       const productToUpdate = products.find((product) => product.id === id);
//       const response = await fetch(`${baseurl}/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(productToUpdate),
//       });
//       if (!response.ok) throw new Error('Failed to update product');
//       alert('Product updated successfully!');
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`${baseurl}/${id}`, { method: 'DELETE' });
//       if (!response.ok) throw new Error('Failed to delete product');
//       setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
//       alert('Product deleted successfully!');
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
//       <div className="w-full max-w-2xl">
//         {products.map(({ id, name, price, quantity, image }) => (
//           <div key={id} className="bg-white shadow-md rounded-lg p-4 mb-4">
//             {['name', 'price', 'quantity', 'image'].map((field) => (
//               <input
//                 key={field}
//                 name={field}
//                 type={field === 'price' || field === 'quantity' ? 'number' : 'text'}
//                 value={{ name, price, quantity, image }[field]}
//                 onChange={(e) => handleChange(e, id)}
//                 className="w-full border p-2 rounded mb-2"
//               />
//             ))}
//             <div className="flex gap-2">
//               <button onClick={() => handleUpdate(id)} className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
//               <button onClick={() => handleDelete(id)} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UpdateAndDelete;
import React, { useEffect, useState } from "react";

const baseurl = "http://localhost:3000/api/products";

const UpdateAndDelete = () => {
  const [products, setProducts] = useState([]);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(baseurl);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle input changes for a product
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [name]: value } : product
      )
    );
  };

  // Update a product
  const handleUpdate = async (id) => {
    try {
      const productToUpdate = products.find((product) => product.id === id);
      const response = await fetch(`${baseurl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productToUpdate),
      });
      if (!response.ok) throw new Error("Failed to update product");
      const updatedProduct = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? updatedProduct : product
        )
      );
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete a product
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseurl}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete product");
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map(({ id, name, price, quantity, image }) => (
          <div key={id} className="border rounded p-4 mb-4 shadow-md">
            <div className="flex flex-col gap-3">
              <label>
                <span className="font-semibold">Name: </span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => handleChange(e, id)}
                  className="border rounded p-1 ml-2"
                />
              </label>
              <label>
                <span className="font-semibold">Price: </span>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => handleChange(e, id)}
                  className="border rounded p-1 ml-2"
                />
              </label>
              <label>
                <span className="font-semibold">Quantity: </span>
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => handleChange(e, id)}
                  className="border rounded p-1 ml-2"
                />
              </label>
              <label>
                <span className="font-semibold">Image URL: </span>
                <input
                  type="text"
                  name="image"
                  value={image || ""}
                  onChange={(e) => handleChange(e, id)}
                  className="border rounded p-1 ml-2"
                />
              </label>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleUpdate(id)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default UpdateAndDelete;
