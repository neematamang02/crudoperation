// // import React, { useState } from 'react';

// // const Create = () => {
// //   const [product, setProduct] = useState({ name: '', price: '', quantity: '', image: '' });

// //   const handleChange = (e) => {
// //     setProduct({ ...product, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await fetch('http://localhost:3000/api/products', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(product),
// //       });
// //       if (!response.ok) throw new Error('Failed to add product');
// //       alert('Product added successfully!');
// //       setProduct({ name: '', price: '', quantity: '', image: '' });
// //     } catch (error) {
// //       console.error(error.message);
// //     }
// //   };

// //   return (

// //     <div className="flex justify-center items-center min-h-screen">
// //       <form className="w-1/3 bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
// //         <h2 className="text-center text-2xl font-bold mb-4">Add Product</h2>
// //         <input name="name" placeholder="Product Name" value={product.name} onChange={handleChange} className="w-full border p-2 rounded mb-3" />
// //         <input name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} className="w-full border p-2 rounded mb-3" />
// //         <input name="quantity" type="number" placeholder="Quantity" value={product.quantity} onChange={handleChange} className="w-full border p-2 rounded mb-3" />
// //         <input name="image" placeholder="Image URL" value={product.image} onChange={handleChange} className="w-full border p-2 rounded mb-3" />
// //         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Add Product</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Create;
// import React, { useState } from "react";
// import FooBar from "./FooBar";

// const Create = () => {
//   // Define the fields and their properties
//   const fields = [
//     { name: "name", placeholder: "Product Name", type: "text" },
//     { name: "price", placeholder: "Price", type: "number" },
//     { name: "quantity", placeholder: "Quantity", type: "number" },
//     { name: "image", placeholder: "Image URL", type: "text" },
//   ];

//   // State to store product data
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     image: "",
//   });

//   // Track which input field (step) is currently active
//   const [currentStep, setCurrentStep] = useState(0);

//   const [showFoobar, setShowFoobar] = useState(false);

//   // Handle change for the currently visible input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//   };

//   // Move to the next field if the current field is not empty
//   const handleNext = () => {
//     if (product[fields[currentStep].name]) {
//       setCurrentStep((prevStep) => prevStep + 1);
//     }
//   };

//   // Go back to the previous field
//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prevStep) => prevStep - 1);
//     }
//   };

//   // Submit the form data to the API
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3000/api/products", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(product),
//       });
//       if (!response.ok) throw new Error("Failed to add product");
//       alert("Product added successfully!");
//       // Reset form and step
//       setProduct({ name: "", price: "", quantity: "", image: "" });
//       setCurrentStep(0);
//     } catch (error) {
//       console.error("Error adding product:", error.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <button
//         onClick={() => setShowFooBar(true)}
//         className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
//       >
//         Show FooBar
//       </button>
//       {showFoobar && <FooBar />}
//       <form
//         className="w-1/3 bg-white shadow-md rounded-lg p-6"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-center text-2xl font-bold mb-4">Add Product</h2>

//         {/* Show only the current input field */}
//         <div>
//           <input
//             name={fields[currentStep].name}
//             type={fields[currentStep].type}
//             placeholder={fields[currentStep].placeholder}
//             value={product[fields[currentStep].name]}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mb-3"
//             autoFocus
//           />
//         </div>

//         {/* Navigation buttons */}
//         <div className="flex justify-between">
//           {currentStep > 0 && (
//             <button
//               type="button"
//               onClick={handleBack}
//               className="bg-gray-600 text-white px-4 py-2 rounded"
//             >
//               Back
//             </button>
//           )}

//           {currentStep < fields.length - 1 && (
//             <button
//               type="button"
//               onClick={handleNext}
//               disabled={!product[fields[currentStep].name]}
//               className="bg-blue-600 text-white px-4 py-2 rounded ml-auto"
//             >
//               Next
//             </button>
//           )}

//           {currentStep === fields.length - 1 && (
//             <button
//               type="submit"
//               disabled={!product[fields[currentStep].name]}
//               className="bg-green-600 text-white px-4 py-2 rounded ml-auto"
//             >
//               Submit
//             </button>
//           )}
//         </div>
//       </form>
//       {showFoobar && <FooBar />}
//     </div>
//   );
// };

// export default Create;
import React, { useState } from "react";
import FooBar from "./FooBar";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const fields = [
    { name: "name", placeholder: "Product Name", type: "text" },
    { name: "price", placeholder: "Price", type: "number" },
    { name: "quantity", placeholder: "Quantity", type: "number" },
    { name: "image", placeholder: "Image URL", type: "text" },
  ];

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    image: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [showFoobar, setShowFoobar] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => {
    if (product[fields[currentStep].name]) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error("Failed to add product");
      alert("Product added successfully!");
      setProduct({ name: "", price: "", quantity: "", image: "" });

      setCurrentStep(0);
      // Redirect to /display after successful submission
      navigate("/display");
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };
  const progress = (currentStep / (fields.length - 1)) * 100;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <button
        onClick={() => setShowFoobar(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Show FooBar
      </button>
      {showFoobar && <FooBar />}
      <form
        className="w-1/3 bg-white shadow-md rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-2xl font-bold mb-4">Add Product</h2>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded mb-4">
          <div
            className="bg-blue-600 h-2 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <input
          name={fields[currentStep].name}
          type={fields[currentStep].type}
          placeholder={fields[currentStep].placeholder}
          value={product[fields[currentStep].name]}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          autoFocus
        />

        <div className="flex justify-between">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Back
            </button>
          )}
          {currentStep < fields.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!product[fields[currentStep].name]}
              className="bg-blue-600 text-white px-4 py-2 rounded ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={!product[fields[currentStep].name]}
              className="bg-green-600 text-white px-4 py-2 rounded ml-auto"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Create;
