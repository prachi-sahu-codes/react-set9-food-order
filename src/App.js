import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

import "./App.css";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Cart } from "./pages/Cart";

const getActiveStyle = ({ isActive }) => ({
  color: isActive ? "#240046" : "#7b2cbf",
  textDecoration: isActive ? "underline" : "",
});

function App() {
  return (
    <div className="App">
      <nav className="navigation">
        <NavLink to="/" style={getActiveStyle} className="navLink">
          Home
        </NavLink>
        <NavLink to="/menu" style={getActiveStyle} className="navLink">
          Menu
        </NavLink>
        <NavLink to="/cart" style={getActiveStyle} className="navLink">
          Cart
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
