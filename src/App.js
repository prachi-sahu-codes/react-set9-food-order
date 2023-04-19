import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Header } from "./component/Header";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Cart } from "./pages/Cart";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
