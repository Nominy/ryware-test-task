import type { Address } from "../types";

export type SortOrder = "asc" | "desc";

export function formatAddress(address: Address): string {
  return `${address.street}, ${address.city}, ${address.state}, ${address.zip}`;
}

export function getNextSortOrder(current: SortOrder): SortOrder {
  return current === "asc" ? "desc" : "asc";
}

export function compareAddress<T extends { address: Address; id?: string }>(
  a: T,
  b: T,
  order: SortOrder = "asc"
): number {
  const aStr = formatAddress(a.address);
  const bStr = formatAddress(b.address);
  const cmp = aStr.localeCompare(bStr, undefined, { sensitivity: "base" });
  if (cmp !== 0) return order === "asc" ? cmp : -cmp;
  return (a.id ?? "").localeCompare(b.id ?? "");
}


