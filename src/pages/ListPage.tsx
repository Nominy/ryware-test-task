import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import ParkingItemCard from "../components/ParkingItemCard";
import ListHeader from "../components/ListHeader";
import { compareAddress, type SortOrder } from "../utils/address";

export default function ListPage() {
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const parkingItems = [
    {
      id: "1",
      address: {
        street: "c 1Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
      },
    },
    {
      id: "2",
      address: {
        street: "a Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
      },
    },
    {
      id: "3",
      address: {
        street: "b Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
      },
    }
  ];

  const sortedItems = [...parkingItems].sort((a, b) => compareAddress(a, b, sortOrder));

  return (
    <div>
      <h1>ListPage</h1>
      <ListHeader sortOrder={sortOrder} onChangeSortOrder={setSortOrder} />
      <ul>
        {sortedItems.map((item) => (
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
