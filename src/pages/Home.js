import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1 className="page-heading ">Welcome to neoG Food Ordering App!</h1>
      <Link to="/menu" className="navLink">
        Go to Menu
      </Link>
    </div>
  );
};
