import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { fakeFetch } from "./fakeFetch";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [menuList, setMenuList] = useState([]);
  const [filteredInputList, setFilteredInputList] = useState([]);
  const [cartList, setCartList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isSpicy, setIsSpicy] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/menu");
      if (response.status === 200) {
        setMenuList(response?.data?.menu);
        setFilteredInputList(response?.data?.menu);
      }
    } catch (error) {
      console.log("Error 404: Food list not found.");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filteredMenuData = menuList.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (isVegetarian) {
      filteredMenuData = filteredMenuData.filter(
        (item) => item.is_vegetarian === true
      );
    }
    if (isSpicy) {
      filteredMenuData = filteredMenuData.filter(
        (item) => item.is_spicy === true
      );
    }
    if (sortBy === "sortLowToHigh") {
      filteredMenuData = filteredMenuData.sort((a, b) => a.price - b.price);
    } else if (sortBy === "sortHighToLow") {
      filteredMenuData = filteredMenuData.sort((a, b) => b.price - a.price);
    }
    setFilteredInputList(filteredMenuData);
  }, [menuList, searchTerm, isVegetarian, isSpicy, sortBy]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleVegCheckboxChange = (event) => {
    setIsVegetarian(event.target.checked);
  };

  const handleSpicyCheckboxChange = (event) => {
    setIsSpicy(event.target.checked);
  };

  const handleRadioChange = (event) => {
    setSortBy(event.target.value);
  };

  /******loading******/

  if (menuList.length <= 0) {
    return <h1 className="page-heading">Loading...</h1>;
  }

  /*********Cart********/
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
    <DataContext.Provider
      value={{
        menuList,
        filteredInputList,
        searchTerm,
        isVegetarian,
        isSpicy,
        sortBy,
        handleInputChange,
        handleVegCheckboxChange,
        handleSpicyCheckboxChange,
        handleRadioChange,
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
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
