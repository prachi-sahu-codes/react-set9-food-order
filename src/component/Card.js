export const Card = ({
  id,
  name,
  description,
  price,
  image,
  is_vegetarian,
  is_spicy,
  delivery_time,
  noDetail,
}) => {
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
      {noDetail && <button>Add to Cart</button>}
    </>
  );
};
