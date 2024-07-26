import { twMerge } from "tailwind-merge";

export function handleBaseDialog({
  id,
  isVisible,
}: {
  id: string;
  isVisible: boolean;
}) {
  const dialog = document.getElementById(
    `base_dialog_${id}`
  ) as HTMLDialogElement;
  if (isVisible) return dialog?.showModal();
  return dialog.close();
}

export default function BaseDialog({
  children,
  id,
  classDialog,
}: {
  children: React.ReactNode;
  id: string;
  classDialog?: string;
}) {
  return (
    <dialog
      id={`base_dialog_${id}`}
      className={twMerge("modal bg-black/70 backdrop-blur-[2px]", classDialog)}
    >
      <div className={"modal-box bg-transparent shadow-none px-2"}>
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          id="close-dialog-buton"
          className="bg-transparent !border-none !p-0 !m-0"
        >
          close
        </button>
      </form>
    </dialog>
  );
}
