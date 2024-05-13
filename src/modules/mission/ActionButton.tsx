import checkIcon from "@/assets/game/check.png";

interface IProps {
  title: string;
  description: string;
  textButton: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: any;
  isEnable?: boolean;
  logo: string;
  noMargin?: boolean;
  currentStep: number;
  index: number;
}

const ActionButton = (props: IProps) => {
  return (
    <div
      className={`bg-amber-200 text-slate-800 flex justify-between p-4 ${
        !props.noMargin && "mb-4"
      } rounded-xl items-center`}
    >
      <div className="flex">
        <img className="h-8 w-8 mr-4" src={props.logo}></img>
        <div>
          <div className="font-bold text-xs text-amber-800">{props.title}</div>
          <div className="text-xs">{props.description}</div>
        </div>
      </div>
      {!props.isEnable ? (
        <button
          disabled
          className="h-10 bg-yellow-800 text-white font-bold py-1 px-4 rounded-2xl opacity-50"
        >
          +20
        </button>
      ) : props.currentStep < props.index ? (
        <button
          onClick={() => {
            props.onClick();
          }}
          className="h-10 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded-2xl"
        >
          <span>+20</span>
        </button>
      ) : (
        <div className="mr-4">
          <img className="w-8" src={checkIcon}></img>
        </div>
      )}
    </div>
  );
};

export default ActionButton;
