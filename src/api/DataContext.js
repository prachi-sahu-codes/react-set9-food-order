import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { fakeFetch } from "./fakeFetch";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [menuList, setMenuList] = useState([]);
  const [filteredInputList, setFilteredInputList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isSpicy, setIsSpicy] = useState(false);
  const [sortBy, setSortBy] = useState("");

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
