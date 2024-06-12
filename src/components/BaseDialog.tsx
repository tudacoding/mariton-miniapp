import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function BaseDialog() {
  const { childrenDialog, classWrapperDialog, classDialog } = useSelector(
    (s: RootState) => s.actionsStore
  );
  return (
    <dialog id="base_dialog" className={"modal " + classDialog}>
      <div
        className={
          "modal-box bg-transparent !shadow-none " + classWrapperDialog
        }
      >
        {childrenDialog}
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
