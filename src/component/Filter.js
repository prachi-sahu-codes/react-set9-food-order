import { useData } from "../api/DataContext";

export const Filter = () => {
  const { searchHandler, checkBoxHandler, sortHandler } = useData();

  return (
    <form className="menu-form">
      <span className="filters-heading">Filters: </span>
      <input
        type="text"
        onChange={searchHandler}
        placeholder="Search food here"
        className="inputSearch"
      />
      <input
        type="checkbox"
        name="check-veg"
        id="check-veg"
        onChange={() => checkBoxHandler("is_vegetarian")}
      />
      <label for="check-veg">Veg</label>
      <input
        type="checkbox"
        name="check-spicy"
        id="check-spicy"
        onChange={() => checkBoxHandler("is_spicy")}
      />
      <label for="check-spicy">Spicy</label>
      <input
        type="radio"
        name="sortPrice"
        id="lowToHigh"
        value="sortLowToHigh"
        onChange={() => sortHandler("lowToHigh")}
      />
      <label for="lowToHigh">Sort (Price) Low to High</label>
      <input
        type="radio"
        name="sortPrice"
        value="sortHighToLow"
        id="highToLow"
        onChange={() => sortHandler("highToLow")}
      />
      <label for="highToLow">Sort (Price) High to Low</label>
    </form>
  );
};
