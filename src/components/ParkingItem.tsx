import {
  useIncrementParkingUsage,
  useToggleParkingStatus,
} from "../services/api";
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
    <div className="section space-y-3">
      <div>
        <div className="muted text-sm">ID</div>
        <h2 className="text-xl font-semibold text-gray-900">
          {props.itemInfo.id}
        </h2>
      </div>
      <div className="text-sm text-gray-600">
        {formatAddress(props.itemInfo.address)}
      </div>
      <div className="text-sm">
        Status:{" "}
        <span
          className={props.itemInfo.status ? "text-green-700" : "text-red-700"}
        >
          {props.itemInfo.status ? "enabled" : "disabled"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="btn"
          onClick={async () =>
            await toggleParkingStatus({
              id: props.itemInfo.id,
              status: !props.itemInfo.status,
            })
          }
        >
          Toggle Status
        </button>
        <button
          className="btn btn-primary"
          onClick={async () => {
            if (!props.itemInfo.status) {
              openError(
                "You can't increment a disabled parking",
                "Not Allowed",
              );
              return;
            }
            try {
              await incrementParkingUsage(props.itemInfo.id);
            } catch (err) {
              const message = err instanceof Error ? err.message : String(err);
              openError(message, "Increment Error");
            }
          }}
        >
          Increment Usage
        </button>
      </div>
      <div className="text-sm">{props.itemInfo.usages} usages</div>
      <ErrorDialog
        open={errorOpen}
        title={errorTitle}
        message={errorMessage ?? ""}
        onClose={closeError}
      />
    </div>
  );
}

export default ParkingItem;
