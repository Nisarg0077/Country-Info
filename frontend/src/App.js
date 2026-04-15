import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
import Datalist from "./components/Datalist";
import ContData from "./components/ContData";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar />*/}
      <Routes>
        <Route path="/" element={<Datalist />} />
        <Route path="/contdata/:code" element={<ContData />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
