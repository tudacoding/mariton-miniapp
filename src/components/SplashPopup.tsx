import splashImg from "@/assets/images/splash.png";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
export default function SplashPopup() {
  const { classDialog } = useSelector((s: RootState) => s.actionsStore);
  return (
    <dialog
      id="splash_dialog"
      className={twMerge("modal bg-[#0006]", classDialog)}
    >
      <img className="w-screen h-screen" src={splashImg}></img>
    </dialog>
  );
}
