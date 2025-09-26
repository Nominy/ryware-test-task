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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50"
    >
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative mx-auto mt-24 max-w-lg px-4">
        <div className="section">
          <div className="flex items-center justify-between">
            <h2 id={titleId} className="text-lg font-semibold text-gray-900">
              {title ?? "Message"}
            </h2>
            <button
              type="button"
              className="btn"
              onClick={onClose}
              aria-label="Close popup"
            >
              ✕
            </button>
          </div>

          <div className="mt-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
