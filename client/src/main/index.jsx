import Header from "../components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  Home,
  Cart,
  Collection,
  Contact,
  Login,
  Profile,
  Register,
  Shop,
} from "../pages";

export default function Index() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:sessionID" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}
