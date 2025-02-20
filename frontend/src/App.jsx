import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import UpdateandDelete from "./pages/UpdateandDelete";
import ProductManage from "./pages/ProductManage";

const App = () => {
  return (
    <Routes>
      {/* Layout as Parent */}
      <Route index element={<Create />} /> {/* Default route */}
      <Route path="UpdateandDelete" element={<UpdateandDelete />} />
      <Route path="Display" element={<ProductManage />} />
    </Routes>
  );
};

export default App;
