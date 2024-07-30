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
  const { account, listMissions } = useSelector(
    (s: RootState) => s.accountStore
  );
  const currentStepMission =
    listMissions && listMissions.length
      ? listMissions.find((i) => i.attributes.missionNumber === props.index)
      : null;
  const currentStepTime = currentStepMission
    ? new Date(currentStepMission.attributes.createdAt).getTime()
    : 10000000000000000;
  const isCheckDone = currentStepMission
    ? new Date().getTime() > currentStepTime + 2 * 60000
    : false;
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
      {!props.inviteFriend &&
      !(props.completedMission || "").includes(`${props.index}`) ? (
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
              {/* <div className="text-xs mr-4">Ref: {props.countRef || 0}</div> */}
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
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <rect x="8" y="8" width="12" height="12" rx="2" />{" "}
                  <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                </svg>
              </div>
            </div>
          ) : (
            <div>
              {isCheckDone ? (
                <img className="w-8" src={checkIcon}></img>
              ) : (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-50"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActionButton;
