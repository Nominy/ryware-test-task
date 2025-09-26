import { type ReactNode, useId } from "react";

export interface PopupProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children?: ReactNode;
}

export default function Popup(props: PopupProps) {
  const { open, title, onClose, children } = props;
  const titleId = useId();

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div>
        <div>
          <h2 id={titleId}>{title ?? "Message"}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close popup"
          >
            ✕
          </button>
        </div>

        <div>
          {children}
        </div>
      </div>
    </div>
  );
}


