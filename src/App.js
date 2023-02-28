import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Cart from "./pages/cart";
import Home from "./pages/home";
import OtherPage from "./pages/other-pages";

import "./styles/base.css";

function App() {
  return (
    <BrowserRouter>
      <Toaster/>
      <Routes >
      <Route path="/" element={<Home />}/>
      <Route path="*" element={<OtherPage />}/>

      </Routes>
  
    </BrowserRouter>
  );
}

export default App;
