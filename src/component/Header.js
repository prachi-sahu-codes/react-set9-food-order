import { NavLink } from "react-router-dom";
import { useCart } from "../api/CartContext";

const getActiveStyle = ({ isActive }) => ({
  color: isActive ? "#240046" : "#7b2cbf",
  fontWeight: isActive ? "700" : "500",
});

export const Header = () => {
  const { cartList } = useCart();
  return (
    <nav className="navigation">
      <NavLink to="/" style={getActiveStyle} className="navLink">
        Home
      </NavLink>
      <NavLink to="/menu" style={getActiveStyle} className="navLink">
        Menu
      </NavLink>
      <NavLink to="/cart" style={getActiveStyle} className="navLink">
        Cart{cartList.length === 0 ? "" : `(${cartList.length})`}
      </NavLink>
    </nav>
  );
};
