import { useData } from "../api/DataContext";
import { useState } from "react";

export const Filter = () => {
  const {
    input,
    filteredInputList,
    setFilteredInputList,
    handleInputChange,
    handleRadioChange,
    menuList,
  } = useData();

  const [veg, setVeg] = useState(false);
  const [spicy, setSpicy] = useState(false);

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setSpicy(true);
      // setFilteredInputList(
      //   JSON.parse(JSON.stringify(menuList)).filter((x) => x.is_spicy)
      // );
      setFilteredInputList([...filteredInputList].filter((x) => x.is_spicy));
    } else {
      setSpicy(false);
      // setFilteredInputList(JSON.parse(JSON.stringify(menuList)));
      setFilteredInputList([...menuList]);
    }
  };

  return (
    <form className="menu-form">
      <span className="filters-heading">Filters: </span>

      <input
        type="text"
        onChange={handleInputChange}
        value={input.searchTerm}
        placeholder="Search food here"
      />
      <label>
        <input
          type="checkbox"
          name="vegetable"
          // value="is_vegetarian"
          checked={input.isVegetarian}
          onChange={handleCheckboxChange}
        />
        Veg
      </label>

      <label>
        <input
          type="checkbox"
          name="spicy"
          // value="is_spicy"
          checked={input.isSpicy}
          onChange={handleCheckboxChange}
        />
        Spicy
      </label>

      <label>
        <input
          type="radio"
          name="sortPrice"
          value="sortLowToHigh"
          // checked={input.sort === "sortLowToHigh"}
          onChange={handleRadioChange}
        />{" "}
        Sort (price) Low to High
      </label>
      <label>
        <input
          type="radio"
          name="sortPrice"
          value="sortHighToLow"
          // checked={input.sort === "sortHighToLow"}
          onChange={handleRadioChange}
        />{" "}
        Sort (price) High to Low
      </label>
    </form>
  );
};
