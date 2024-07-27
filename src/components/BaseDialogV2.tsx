import { ToastContainer } from "react-toastify";
import { twMerge } from "tailwind-merge";
import BaseDivider from "@/components/BaseDivider";
import background from "@/assets/air/background-v2.png";
import Loading from "@/assets/icons/Loading";
import { ReactElement, useState } from "react";
import MaritonToken from "@/assets/icons/MaritonToken";
import BaseAction from "@/components/BaseAction";
import closeButton from "@/assets/game/close-button.png";
import boostButton from "@/assets/air/boost-button.png";
import BaseButton from "./BaseButton";

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
  rightAction = () => {},
  leftAction = () => {},
  rightButton,
  childrenButton,
  classChildrenButton,
}: {
  children: React.ReactNode;
  id: string;
  classDialog?: string;
  leftAction?: () => void;
  rightAction: () => any;
  rightButton?: ReactElement;
  childrenButton: ReactElement;
  classChildrenButton?: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleRightAction = async () => {
    const res = await rightAction();
    if (res) closeDialog();
  };
  return (
    <>
      <BaseButton className={classChildrenButton} onClick={openDialog}>
        {childrenButton}
      </BaseButton>
      <input
        type="checkbox"
        id={`base_dialog_${id}`}
        className={twMerge(
          "modal-toggle bg-black/70 backdrop-blur-[2px]",
          classDialog
        )}
        checked={isDialogOpen}
        onChange={() => {}}
      />
      <div className="modal" role="dialog">
        <div className={"modal-box bg-transparent shadow-none px-2"}>
          <div className="h-fix w-fix relative">
            <img src={background} className="absolute h-full w-full z-[-5]" />
            {children}
            <div className="absolute bottom-[-20px] flex flex-row justify-center w-full gap-6">
              <BaseAction
                onClick={() => {
                  closeDialog();
                  leftAction();
                }}
              >
                <img src={closeButton} alt="" className="object-contain h-12" />
              </BaseAction>
              <BaseAction onClick={handleRightAction}>{rightButton}</BaseAction>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <label
            htmlFor={`base_dialog_${id}`}
            className="bg-transparent !border-none !p-0 !m-0"
            onClick={closeDialog}
          >
            Close
          </label>
        </form>
      </div>
    </>
  );
}
