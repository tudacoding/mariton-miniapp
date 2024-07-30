interface IProps {
  logo: string;
  title: string;
  description: string;
  completedMission: string;
  onClick: () => void;
}

const BoostActionButton = (props: IProps) => {
  return (
    <div
      className="bg-amber-200 text-slate-800 flex justify-between p-4 mb-4 rounded-xl items-center"
      style={{ backgroundColor: "#EBEAD2" }}
    >
      <div className="flex items-center">
        <img className="h-8 w-8 mr-4" src={props.logo} alt="logo" />
        <div>
          <div className="font-bold text-xs text-amber-800">{props.title}</div>
          <div className="text-xs">{props.description}</div>
        </div>
      </div>
      <button
        onClick={props.onClick}
        className="h-10 bg-yellow-500 active:bg-yellow-700 font-bold py-1 px-4 rounded-2xl text-[#925E04]"
      >
        <span>Next</span>
      </button>
    </div>
  );
};

export default BoostActionButton;
