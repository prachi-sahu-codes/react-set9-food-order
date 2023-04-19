import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { fakeFetch } from "./fakeFetch";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [menuList, setMenuList] = useState([]);
  const [filteredInputList, setFilteredInputList] = useState([]);
  const [input, setInput] = useState({
    is_vegetarian: false,
    is_spicy: false,
  });

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

  if (menuList.length <= 0) {
    return <h1 className="page-heading">Loading...</h1>;
  }

  /**********Input**************/

  const handleInputChange = (event) => {
    const enteredValue = event.target.value;
    if (enteredValue) {
      const filteredList = filteredInputList.filter((dish) =>
        dish.name.toLowerCase().includes(enteredValue.toLowerCase())
      );
      setFilteredInputList(filteredList);
    } else {
      setFilteredInputList([...menuList]);
    }
  };

  /*********radio******/

  const handleRadioChange = (event) => {
    const radioValue = event.target.value;

    if (radioValue === "sortLowToHigh") {
      setFilteredInputList((filteredInputList) =>
        [...filteredInputList].sort((a, b) => a.price - b.price)
      );
    } else if (radioValue === "sortHighToLow") {
      setFilteredInputList((filteredInputList) =>
        [...filteredInputList].sort((a, b) => b.price - a.price)
      );
    } else {
      return menuList;
    }
  };

  return (
    <DataContext.Provider
      value={{
        menuList,
        input,
        setInput,
        handleInputChange,
        filteredInputList,
        handleRadioChange,
        setFilteredInputList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
