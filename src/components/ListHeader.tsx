import type { SortOrder } from "../utils/address";

export interface ListHeaderProps {
  sortOrder: SortOrder;
  onChangeSortOrder: (order: SortOrder) => void;
}

export default function ListHeader(props: ListHeaderProps) {
  const isAsc = props.sortOrder === "asc";
  const next = isAsc ? "desc" : "asc";

  return (
    <div className="flex items-center justify-between">
      {/* <h1 className="text-xl font-semibold">List</h1> */}
      <button
        type="button"
        className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
        onClick={() => props.onChangeSortOrder(next)}
        aria-label={`Sort by address ${next}`}
     >
        Address {isAsc ? "▲" : "▼"}
      </button>
    </div>
  );
}