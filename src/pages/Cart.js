import { useCart } from "../api/CartContext";
import { Card } from "../component/Card";

export const Cart = () => {
  const {
    cartList,
    totalCartPrice,
    clickCoupon,
    isCouponApplied,
    deliveryTime,
    finalPrice,
  } = useCart();

  return (
    <>
      {totalCartPrice > 0 && (
        <div className="sub-details">
          <span>Total Price: ${finalPrice}</span>
          <span>Total Delivery Time: {deliveryTime()}</span>
          <button onClick={clickCoupon} className="couponBtn">
            {isCouponApplied ? "Coupon Applied" : "Apply Coupon"}
          </button>
        </div>
      )}

      {cartList.length ? (
        <ul className="card-list">
          {cartList.map((item) => (
            <li key={item.id} className="card">
              <Card {...item} />
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="sub-heading">Your Cart List is empty!!!</h2>
      )}
    </>
  );
};
