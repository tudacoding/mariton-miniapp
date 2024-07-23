import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import backgroundDialog from "@/assets/air/short-background-body.png";
import { R } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

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
      className={twMerge("modal bg-[#0006]", classDialog)}
    >
      <div className={twMerge("modal-box bg-transparent shadow-none")}>
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
