import { Link } from "react-router-dom";
import { useState } from "react";
import ParkingItemCard from "../components/ParkingItemCard";
import ListHeader from "../components/ListHeader";
import { compareAddress, type SortOrder } from "../utils/address";
import { useParkings } from "../services/api";
import CreateParkingModal from "../components/CreateParkingModal";

export default function ListPage() {
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data, isLoading, isError, error } = useParkings();

  const items = data ?? [];
  const sortedItems = [...items].sort((a, b) =>
    compareAddress(a, b, sortOrder),
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">Parkings</h1>
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
        >
          New Parking
        </button>
      </div>

      <ListHeader sortOrder={sortOrder} onChangeSortOrder={setSortOrder} />
      {isLoading && <div>Loading…</div>}
      {isError && <div role="alert">{error.message}</div>}
      <ul>
        {Object.entries(sortedItems)?.map(([key, item]) => (
          <li key={key} className="my-4">
            <Link to={`/${item.id}`}>
              <ParkingItemCard cardInfo={item} />
            </Link>
          </li>
        ))}
      </ul>

      <CreateParkingModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  );
}
