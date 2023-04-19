import { useData } from "../api/DataContext";

export const Filter = () => {
  const {
    searchTerm,
    isVegetarian,
    isSpicy,
    sortBy,
    handleInputChange,
    handleVegCheckboxChange,
    handleSpicyCheckboxChange,
    handleRadioChange,
  } = useData();

  return (
    <form className="menu-form">
      <span className="filters-heading">Filters: </span>

      <input
        type="text"
        onChange={handleInputChange}
        value={searchTerm}
        placeholder="Search food here"
      />
      <label>
        <input
          type="checkbox"
          checked={isVegetarian}
          onChange={handleVegCheckboxChange}
        />
        Veg
      </label>

      <label>
        <input
          type="checkbox"
          checked={isSpicy}
          onChange={handleSpicyCheckboxChange}
        />
        Spicy
      </label>

      <label>
        <input
          type="radio"
          name="sortPrice"
          value="sortLowToHigh"
          checked={sortBy === "sortLowToHigh"}
          onChange={handleRadioChange}
        />{" "}
        Sort (price) Low to High
      </label>
      <label>
        <input
          type="radio"
          name="sortPrice"
          value="sortHighToLow"
          checked={sortBy === "sortHighToLow"}
          onChange={handleRadioChange}
        />{" "}
        Sort (price) High to Low
      </label>
    </form>
  );
};
