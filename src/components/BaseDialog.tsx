import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import backgroundDialog from "@/assets/air/short-background-body.png";

export default function BaseDialog() {
  const {
    childrenDialog,
    classWrapperDialog,
    classDialog,
    showBackgroundDialog,
  } = useSelector((s: RootState) => s.actionsStore);
  return (
    <dialog
      id="base_dialog"
      className={twMerge("modal bg-[#0006]", classDialog)}
    >
      <div
        className={twMerge(
          "modal-box bg-transparent !shadow-none",
          classWrapperDialog
        )}
      >
        {showBackgroundDialog ? (
          <div className="h-fix w-fix relative">
            <img
              src={backgroundDialog}
              alt=""
              className="absolute h-full w-full z-[-5]"
            />
            {childrenDialog}
          </div>
        ) : (
          childrenDialog
        )}
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
