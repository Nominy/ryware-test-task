import {
  useCallback,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
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

  const [form, setForm] = useState<ParkingFormValue>(() =>
    createEmptyParkingForm(),
  );
  const { mutateAsync, isPending, error } = useCreateParking();

  const [errorOpen, setErrorOpen] = useState(false);
  const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined);
  const [errorMessageState, setErrorMessageState] = useState<string | null>(
    null,
  );
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
    } catch {}
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-parking-title"
      className="fixed inset-0 z-50"
    >
      <div className="absolute inset-0 bg-black/30" onClick={handleClose} />
      <div className="relative mx-auto mt-24 max-w-lg px-4">
        <div className="section">
          <div className="flex items-center justify-between">
            <h2
              id="create-parking-title"
              className="text-lg font-semibold text-gray-900"
            >
              Create Parking
            </h2>
            <button
              type="button"
              className="btn"
              onClick={handleClose}
              aria-label="Close create parking modal"
            >
              ✕
            </button>
          </div>

          <div className="mt-3">
            <ParkingForm
              value={form}
              isPending={isPending}
              onSubmit={handleSubmit}
              onCancel={handleClose}
              onChange={setForm}
              initialFocusRef={initialFocusRef}
              submitLabel="Create"
            />
          </div>
          <ErrorDialog
            open={errorOpen}
            title={errorTitle}
            message={errorMessageState ?? ""}
            onClose={closeError}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateParkingModal;
