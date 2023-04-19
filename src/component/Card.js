import { Link } from "react-router-dom";
import { useData } from "../api/DataContext";

export const Card = ({
  id,
  name,
  description,
  price,
  image,
  delivery_time,
  quantity,
  noDetail,
}) => {
  const { cartList, addCartHandler } = useData();

  const itemInCart = (selectedId) =>
    cartList.find((item) => item.id === selectedId); //if not present gives undefined

  return (
    <>
      <img src={image} alt={name} className="card-img" />
      <h3>{name}</h3>
      <p>
        <span style={{ fontWeight: "600" }}>Description: </span>
        {description}
      </p>
      <p>
        <span style={{ fontWeight: "600" }}>Price: </span>${price}
      </p>
      <p>
        <span style={{ fontWeight: "600" }}>Delivery time: </span>
        {delivery_time} min
      </p>
      {noDetail && (
        <div>
          {itemInCart(id) ? (
            <Link to="/cart">
              <button>Go to Cart</button>
            </Link>
          ) : (
            <button
              onClick={() =>
                addCartHandler({
                  id,
                  name,
                  description,
                  price,
                  image,
                  delivery_time,
                })
              }
            >
              Add to Cart
            </button>
          )}
        </div>
      )}
    </>
  );
};
