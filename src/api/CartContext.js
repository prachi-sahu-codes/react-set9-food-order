import { createContext } from "react";
import { useContext, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const addCartHandler = ({
    id,
    name,
    description,
    price,
    image,
    delivery_time,
  }) => {
    const isItemPresent = cartList.findIndex((item) => item.id === id);
    if (isItemPresent === -1) {
      setCartList((cartList) => [
        ...cartList,
        { id, name, description, price, image, delivery_time, quantity: 1 },
      ]);
    }
  };

  const { totalCartPrice, totalDeliveryTime } = cartList.reduce(
    (acc, item) => ({
      totalCartPrice: acc.totalCartPrice + item.price,
      totalDeliveryTime: acc.totalDeliveryTime + item.delivery_time,
    }),
    { totalCartPrice: 0, totalDeliveryTime: 0 }
  );

  /***********coupon and converting time to hours and mij************/

  const clickCoupon = () => {
    setIsCouponApplied(true);
  };

  const deliveryTime = () => {
    if (totalDeliveryTime < 60) {
      return `${totalDeliveryTime}min`;
    } else {
      const deliveryHour = Math.floor(totalDeliveryTime / 60);
      const deliveryMin = totalDeliveryTime % 60;
      return deliveryMin > 0
        ? `${deliveryHour}hours ${deliveryMin}min`
        : `${deliveryHour}hours`;
    }
  };

  const finalPrice = isCouponApplied
    ? Number(totalCartPrice.toFixed(2)) - 5
    : totalCartPrice.toFixed(2);

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartHandler,
        totalCartPrice,
        totalDeliveryTime,
        isCouponApplied,
        clickCoupon,
        deliveryTime,
        finalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
