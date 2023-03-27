import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Wrapper from "./controller/state";
import Cart from "./pages/cart";
import Home from "./pages/home";
import Login from "./pages/login";
import OtherPage from "./pages/other-pages";
import Register from "./pages/register";

import "./styles/base.css";

function App() {

  return (
    <Wrapper>
    <BrowserRouter>
      <Toaster/>
      <Routes >
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/signup" element={<Register />}/>
      <Route path="*" element={<OtherPage />}/>

      </Routes>
  
    </BrowserRouter>
{/* {autofixImages()} */}
    </Wrapper>
  );
}

export default App;
