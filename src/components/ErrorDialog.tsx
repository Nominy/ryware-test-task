import { type ReactNode } from "react";
import Popup from "./Popup";

export interface ErrorDialogProps {
  open: boolean;
  title?: string;
  message: ReactNode;
  onClose: () => void;
}

export default function ErrorDialog(props: ErrorDialogProps) {
  const { open, title = "Error", message, onClose } = props;

  return (
    <Popup open={open} title={title} onClose={onClose}>
      <div role="alert">{message}</div>
    </Popup>
  );
}


