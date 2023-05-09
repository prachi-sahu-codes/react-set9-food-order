import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { fakeFetch } from "./fakeFetch";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [menuList, setMenuList] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    checkbox: [],
    sort: null,
  });

  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/menu");
      if (response.status === 200) {
        setMenuList(response?.data?.menu);
      }
    } catch (error) {
      console.log("Error 404: Food list not found.");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const searchHandler = (e) => {
    setFilters((filters) => ({ ...filters, search: e.target.value }));
  };

  const checkBoxHandler = (checkInput) => {
    const checkContain = filters.checkbox.includes(checkInput);
    setFilters((filters) => ({
      ...filters,
      checkbox: !checkContain
        ? [...filters.checkbox, checkInput]
        : filters.checkbox.filter((type) => type !== checkInput),
    }));
  };

  const sortHandler = (sortInput) => {
    setFilters((filters) => ({ ...filters, sort: sortInput }));
  };

  const searchFilter = menuList.filter(
    (food) =>
      food.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.is_Veg ? food.is_vegetarian : food)
  );

  const checkboxFilter =
    filters.checkbox.length > 0
      ? searchFilter.filter((food) =>
          filters.checkbox.every((type) => food[type])
        )
      : searchFilter;

  const filteredInputList =
    filters.sort !== null
      ? checkboxFilter.sort((a, b) =>
          filters.sort === "lowToHigh" ? a.price - b.price : b.price - a.price
        )
      : checkboxFilter;

  /******loading******/

  if (menuList.length <= 0) {
    return <h1 className="page-heading">Loading...</h1>;
  }

  return (
    <DataContext.Provider
      value={{
        filteredInputList,
        searchHandler,
        checkBoxHandler,
        sortHandler,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
