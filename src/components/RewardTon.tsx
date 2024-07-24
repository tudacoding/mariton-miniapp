import TonToken from "@/assets/icons/TonToken";

const RewardTon = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return (
        <div className="flex flex-row justify-center items-center gap-1 text-[22px] font-bold text-t-button">
          <span>30</span>
          <TonToken className="w-5 h-5" />
        </div>
      );
    case 1:
      return (
        <div className="flex flex-row justify-center items-center gap-1 text-xl font-bold text-t-title">
          <span>20</span>
          <TonToken className="w-4 h-4" />
        </div>
      );
    case 2:
      return (
        <div className="flex flex-row justify-center items-center gap-1 text-lg font-bold text-t-description">
          <span>10</span>
          <TonToken className="w-3.5 h-3.5" />
        </div>
      );
    case 3:
      return (
        <div className="flex flex-row justify-center items-center gap-1 text-lg font-bold text-t-description">
          <span>10</span>
          <TonToken className="w-3.5 h-3.5" />
        </div>
      );
    case 4:
      return (
        <div className="flex flex-row justify-center items-center gap-1 text-lg font-bold text-t-description">
          <span>10</span>
          <TonToken className="w-3.5 h-3.5" />
        </div>
      );
    default:
      return <div></div>;
  }
};
export default RewardTon;
