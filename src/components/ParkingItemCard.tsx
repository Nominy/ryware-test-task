import type { ParkingMeter } from "../types";
import { formatAddress } from "../utils/address";

export interface ParkingItemCardProps {
  cardInfo: ParkingMeter;
}

export default function ParkingItemCard(props: ParkingItemCardProps) {
  return (
    <div>
      <h1>{props.cardInfo.id}</h1>
      <h2>
        {formatAddress(props.cardInfo.address)}
      </h2>
    </div>
  );
}
