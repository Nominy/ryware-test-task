import { useCallback, type FormEvent, useEffect, useRef, useState } from "react";
import ParkingForm, {
  createEmptyParkingForm,
  type ParkingFormValue,
} from "./ParkingForm";
import { useCreateParking } from "../services/api";
import ErrorDialog from "./ErrorDialog";

export interface CreateParkingModalProps {
  open: boolean;
  onClose: () => void;
}

function CreateParkingModal(props: CreateParkingModalProps) {
  const { open, onClose } = props;
  const initialFocusRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<ParkingFormValue>(() => createEmptyParkingForm());
  const { mutateAsync, isPending, error } = useCreateParking();

  const [errorOpen, setErrorOpen] = useState(false);
  const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined);
  const [errorMessageState, setErrorMessageState] = useState<string | null>(null);
  const openError = useCallback((message: string, title?: string) => {
    setErrorTitle(title);
    setErrorMessageState(message);
    setErrorOpen(true);
  }, []);
  const closeError = useCallback(() => setErrorOpen(false), []);

  const resetForm = useCallback(() => {
    setForm(createEmptyParkingForm());
  }, []);

  useEffect(() => {
    if (!open) {
      resetForm();
      return;
    }

    const frame = requestAnimationFrame(() => {
      initialFocusRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [open, resetForm]);

  const errorMessage =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : null;

  useEffect(() => {
    if (!open) return;
    if (errorMessage) {
      openError(errorMessage, "Create Parking Error");
    }
  }, [open, errorMessage, openError]);

  if (!open) return null;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await mutateAsync(form);
      handleClose();
    } catch {
    }
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="create-parking-title">
      <div>
        <div>
          <h2 id="create-parking-title">Create Parking</h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close create parking modal"
          >
            ✕
          </button>
        </div>

        <ParkingForm
          value={form}
          isPending={isPending}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          onChange={setForm}
          initialFocusRef={initialFocusRef}
          submitLabel="Create"
        />
        <ErrorDialog open={errorOpen} title={errorTitle} message={errorMessageState ?? ""} onClose={closeError} />
      </div>
    </div>
  );
}

export default CreateParkingModal;
