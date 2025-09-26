import {
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type RefObject,
  type SetStateAction,
} from "react";
import type { Address } from "../types";

export interface ParkingFormValue {
  address: Address;
  status: boolean;
}

export const createEmptyParkingForm = (): ParkingFormValue => ({
  address: {
    street: "",
    city: "",
    state: "",
    zip: "",
  },
  status: true,
});

export interface ParkingFormProps {
  value: ParkingFormValue;
  isPending?: boolean;
  onChange: Dispatch<SetStateAction<ParkingFormValue>>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  initialFocusRef?: RefObject<HTMLInputElement | null>;
  submitLabel?: string;
}

const STATUS_OPTIONS = [
  { label: "enabled", value: "enabled" },
  { label: "disabled", value: "disabled" },
];

const ADDRESS_FIELDS: Array<{
  id: keyof Address;
  label: string;
  autoComplete?: string;
}> = [
  { id: "street", label: "Street", autoComplete: "address-line1" },
  { id: "city", label: "City", autoComplete: "address-level2" },
  { id: "state", label: "State", autoComplete: "address-level1" },
  { id: "zip", label: "ZIP", autoComplete: "postal-code" },
];

export default function ParkingForm(props: ParkingFormProps) {
  const {
    value,
    isPending = false,
    onChange,
    onSubmit,
    onCancel,
    initialFocusRef,
    submitLabel = "Save",
  } = props;

  const handleAddressChange =
    (field: keyof Address) => (event: ChangeEvent<HTMLInputElement>) => {
      const { value: fieldValue } = event.target;
      onChange((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: fieldValue,
        },
      }));
    };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = event.target.value === "enabled";
    onChange((prev) => ({
      ...prev,
      status: nextStatus,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {ADDRESS_FIELDS.map(({ id, label, autoComplete }) => (
        <div key={id}>
          <label htmlFor={id} className="label">
            {label}
          </label>
          <input
            id={id}
            className="input"
            ref={id === "street" ? initialFocusRef : undefined}
            value={value.address[id]}
            onChange={handleAddressChange(id)}
            required
            autoComplete={autoComplete}
          />
        </div>
      ))}

      <div>
        <label htmlFor="status" className="label">
          Status
        </label>
        <select
          id="status"
          className="input"
          value={value.status ? "enabled" : "disabled"}
          onChange={handleStatusChange}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {isPending ? "Creating…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
