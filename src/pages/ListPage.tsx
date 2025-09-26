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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Parkings</h1>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsCreateOpen(true)}
        >
          New Parking
        </button>
      </div>

      <ListHeader sortOrder={sortOrder} onChangeSortOrder={setSortOrder} />
      {isLoading && <div>Loading…</div>}
      {isError && <div role="alert">{error.message}</div>}
      <ul className="grid gap-3">
        {sortedItems?.map((item) => (
          <li key={item.id}>
            <Link to={`/${item.id}`}>
              <ParkingItemCard cardInfo={item} />
            </Link>
          </li>
        ))}
      </ul>

      <CreateParkingModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}
