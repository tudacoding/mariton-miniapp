import checkIcon from "@/assets/game/check.png";
import config from "@/config";
import useCopy from "@/hooks/useCopy";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface IProps {
  title: string;
  description: string;
  textButton: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: any;
  logo: string;
  inviteFriend?: boolean;
  completedMission: string;
  index: number;
  countRef?: number;
}

const ActionButton = (props: IProps) => {
  const { account } = useSelector((s: RootState) => s.accountStore);
  const [copy] = useCopy(account ? `${config.botTele}${account.ref}` : "");
  return (
    <div
      className={`bg-amber-200 text-slate-800 flex justify-between p-4 ${
        !props.inviteFriend && "mb-4"
      } rounded-xl items-center`}
    >
      <div className="flex">
        <img className="h-8 w-8 mr-4" src={props.logo}></img>
        <div>
          <div className="font-bold text-xs text-amber-800">{props.title}</div>
          <div className="text-xs">{props.description}</div>
        </div>
      </div>
      {!props.inviteFriend && !(props.completedMission || "").includes(`${props.index}`) ? (
        <button
          onClick={() => {
            props.onClick();
          }}
          className="h-10 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded-2xl"
        >
          <span>+20</span>
        </button>
      ) : (
        <div className="mr-4 flex items-center">
          {props.inviteFriend ? (
            <div className="flex items-center">
              <div className="text-xs mr-4">Ref: {props.countRef || 0}</div>
              <div
                onClick={() => {
                  copy();
                  toast.success("Copy link successfully!");
                }}
                className="rounded-lg hover:opacity-50 cursor-pointer bg-amber-400 p-2 font-bold text-amber-50"
              >
                <svg
                  className="h-8 w-8 text-amber-50"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <rect x="8" y="8" width="12" height="12" rx="2" />{" "}
                  <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                </svg>
              </div>
            </div>
          ) : (
            <img className="w-8" src={checkIcon}></img>
          )}
        </div>
      )}
    </div>
  );
};

export default ActionButton;
