import { useIncrementParkingUsage, useToggleParkingStatus } from "../services/api";
import type { ParkingMeterFull } from "../types";
import { formatAddress } from "../utils/address";
import { useState, useCallback } from "react";
import ErrorDialog from "./ErrorDialog";

export interface ParkingItemProps {
  itemInfo: ParkingMeterFull;
}

function ParkingItem(props: ParkingItemProps) {
  const { mutateAsync: toggleParkingStatus } = useToggleParkingStatus();
  const { mutateAsync: incrementParkingUsage } = useIncrementParkingUsage();

  const [errorOpen, setErrorOpen] = useState(false);
  const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openError = useCallback((message: string, title?: string) => {
    setErrorTitle(title);
    setErrorMessage(message);
    setErrorOpen(true);
  }, []);
  const closeError = useCallback(() => setErrorOpen(false), []);

  return (
    <div>
      <h1>{props.itemInfo.id}</h1>
      <h2>
        {formatAddress(props.itemInfo.address)}
      </h2>
      <h3>{props.itemInfo.status ? "enabled" : "disabled"}</h3>
      <button onClick={async () => await toggleParkingStatus(props.itemInfo.id)}>Toggle Status</button>
      <button onClick={async () => {
        if (!props.itemInfo.status) {
          openError("You can't increment a disabled parking", "Not Allowed");
          return;
        }
        try {
          await incrementParkingUsage(props.itemInfo.id);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          openError(message, "Increment Error");
        }
      }}>Increment Usage</button>
      <h4>{props.itemInfo.usages} usages</h4>
      <ErrorDialog open={errorOpen} title={errorTitle} message={errorMessage ?? ""} onClose={closeError} />
    </div>
  );
}

export default ParkingItem;
