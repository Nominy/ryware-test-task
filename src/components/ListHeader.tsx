import type { SortOrder } from "../utils/address";

export interface ListHeaderProps {
  sortOrder: SortOrder;
  onChangeSortOrder: (order: SortOrder) => void;
}

export default function ListHeader(props: ListHeaderProps) {
  const isAsc = props.sortOrder === "asc";
  const next = isAsc ? "desc" : "asc";

  return (
    <div className="flex items-center justify-between py-2">
      <button
        type="button"
        className="btn"
        onClick={() => props.onChangeSortOrder(next)}
        aria-label={`Sort by address ${next}`}
      >
        Address {isAsc ? "▲" : "▼"}
      </button>
    </div>
  );
}
