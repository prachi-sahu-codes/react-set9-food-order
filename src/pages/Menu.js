import { useData } from "../api/DataContext";
import { Card } from "../component/Card";
import { Filter } from "../component/Filter";

export const Menu = () => {
  const { filteredInputList } = useData();

  return (
    <>
      <Filter />
      {/* <h2 className="page-heading">Menu List</h2> */}
      <ul className="card-list">
        {filteredInputList.map((dish) => (
          <li key={dish.id} className="card">
            <Card {...dish} noDetail />
          </li>
        ))}
      </ul>
    </>
  );
};
