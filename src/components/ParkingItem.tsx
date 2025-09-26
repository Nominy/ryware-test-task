import type { ParkingMeterFull } from "../types";
import { formatAddress } from "../utils/address";

export interface ParkingItemProps {
  itemInfo: ParkingMeterFull;
}

export default function ParkingItem(props: ParkingItemProps) {
  return (
    <div>
      <h1>{props.itemInfo.id}</h1>
      <h2>
        {formatAddress(props.itemInfo.address)}
      </h2>
      <h3>{props.itemInfo.status ? "Available" : "Occupied"}</h3>
      <h4>{props.itemInfo.usages} usages</h4>
    </div>
  );
}
