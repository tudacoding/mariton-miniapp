import TonToken from "@/assets/icons/TonToken";
import Top1 from "@/assets/icons/Top1";
import Top2 from "@/assets/icons/Top2";
import Top3 from "@/assets/icons/Top3";
import Top4 from "@/assets/icons/Top4";
import Top5 from "@/assets/icons/Top5";

const TopRatting = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return (
        <div className="flex flex-row justify-center items-center gap-1 text-[22px] font-bold text-t-button">
          <Top1 className="w-5 h-5" />
        </div>
      );
    case 1:
      return (
        <div className="flex flex-row justify-center items-center gap-1 text-xl font-bold text-t-title">
          <Top2 className="w-4 h-4" />
        </div>
      );
    case 2:
      return (
        <div className="flex flex-row justify-center items-center gap-1 text-lg font-bold text-t-description">
          <Top3 className="w-3.5 h-3.5" />
        </div>
      );
    case 3:
      return (
        <div className="flex flex-row justify-center items-center gap-1 text-lg font-bold text-t-description">
          <Top4 className="w-3.5 h-3.5" />
        </div>
      );
    case 4:
      return (
        <div className="flex flex-row justify-center items-center gap-1 text-lg font-bold text-t-description">
          <Top5 className="w-3.5 h-3.5" />
        </div>
      );
    default:
      return <div></div>;
  }
};
export default TopRatting;
