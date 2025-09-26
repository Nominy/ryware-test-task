import type { ParkingMeter } from "../types";
import { formatAddress } from "../utils/address";

export interface ParkingItemCardProps {
  cardInfo: ParkingMeter;
}

export default function ParkingItemCard(props: ParkingItemCardProps) {
  return (
    <div className="card p-4">
      <div className="muted text-sm">ID</div>
      <h3 className="text-lg font-semibold text-gray-900">
        {props.cardInfo.id}
      </h3>
      <div className="mt-1 text-sm text-gray-600">
        {formatAddress(props.cardInfo.address)}
      </div>
    </div>
  );
}
