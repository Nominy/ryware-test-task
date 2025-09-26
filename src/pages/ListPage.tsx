import { Link } from "react-router-dom";
import { useState } from "react";
import ParkingItemCard from "../components/ParkingItemCard";
import ListHeader from "../components/ListHeader";
import { compareAddress, type SortOrder } from "../utils/address";
import { useParkings } from "../services/api";

export default function ListPage() {
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const { data, isLoading, isError, error } = useParkings();

  const items = data ?? [];
  const sortedItems = [...items].sort((a, b) =>
    compareAddress(a, b, sortOrder),
  );

  return (
    <div>
      <h1>ListPage</h1>
      <ListHeader sortOrder={sortOrder} onChangeSortOrder={setSortOrder} />
      {isLoading && <div>Loading…</div>}
      {isError && <div role="alert">{error.message}</div>}
      <ul>
        {sortedItems?.map((item) => (
          <li key={item.id} className="my-4">
            <Link to={`/${item.id}`}>
              <ParkingItemCard cardInfo={item} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
