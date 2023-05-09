import { useCart } from "../api/CartContext";
import { Card } from "../component/Card";

export const Cart = () => {
  const {
    cartList,
    setCartList,
    clickCoupon,
    isCouponApplied,
    deliveryTime,
    finalPrice,
    quantityCartHandler,
    removeItem,
  } = useCart();

  return (
    <>
      {finalPrice > 0 && (
        <div className="sub-details">
          <span>Total Price: ${finalPrice}</span>
          <span>Total Delivery Time: {deliveryTime()}</span>
          <button onClick={clickCoupon}>
            {isCouponApplied ? "Coupon Applied" : "Apply Coupon"}
          </button>
          <button className="removeBtn" onClick={() => setCartList([])}>
            Remove all items
          </button>
        </div>
      )}

      {cartList.length ? (
        <ul className="card-list">
          {cartList.map((item) => (
            <li key={item.id} className="card">
              <Card {...item} />
              <div className="cartBtnFlex">
                <div>
                  <button onClick={() => quantityCartHandler("add", item)}>
                    +
                  </button>
                  <span className="cart-qty">{item.quantity}</span>
                  <button onClick={() => quantityCartHandler("sub", item)}>
                    -
                  </button>
                </div>
                <button onClick={() => removeItem(item)} className="removeBtn">
                  Remove Item
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="sub-heading">Your Cart List is empty!!!</h2>
      )}
    </>
  );
};
