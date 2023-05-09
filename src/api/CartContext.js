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
    setIsCouponApplied((isCouponApplied) => !isCouponApplied);
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

  /**************increase decrease quantity**************/

  const quantityCartHandler = (qtyInput, item) => {
    if (qtyInput === "add") {
      const changedCartList = cartList.map((cartItem) =>
        cartItem === item ? { ...item, quantity: item.quantity + 1 } : cartItem
      );
      setCartList(() => changedCartList);
    } else {
      const changedCartList = cartList.map((cartItem) =>
        cartItem === item
          ? { ...item, quantity: item.quantity === 0 ? 0 : item.quantity - 1 }
          : cartItem
      );
      const removeItem = changedCartList.filter((item) => item.quantity > 0);
      setCartList(() => removeItem);
    }
  };

  const removeItem = (itemSelected) => {
    const removeItem = cartList.filter((item) => item !== itemSelected);
    setCartList(() => removeItem);
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        setCartList,
        addCartHandler,
        totalCartPrice,
        totalDeliveryTime,
        isCouponApplied,
        clickCoupon,
        deliveryTime,
        finalPrice,
        quantityCartHandler,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
