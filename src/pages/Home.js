import { Link } from "react-router-dom";
import hero from "../api/hero.jpg";
export const Home = () => {
  return (
    <div className="flex">
      <div className="home-content ">
        <h1 className="hero-heading ">Welcome to neoG Food Ordering App!</h1>
        <Link to="/menu" className="navLink">
          <button className="hero-btn">Go to Menu →</button>
        </Link>
      </div>
      <img src={hero} alt="women eating food" className="hero-img" />
    </div>
  );
};
