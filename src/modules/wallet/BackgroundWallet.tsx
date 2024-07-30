import mushroomsGrass from "@/assets/air/mushrooms-and-grass.png";
import tussock from "@/assets/air/tussock.png";
import background from "@/assets/air/background-v3.png";
// import backgroundShort from "@/assets/air/short-background-body.png";
// import BaseAction from "@/components/BaseAction";
export default function BackgroundWallet() {
  return (
    <div className="w-full h-full absolute z-[-10]">
      <div className="w-full h-full relative pt-[65px]">
        <img className="w-full h-full" src={background} alt="bg-mission-body" />
        <img
          className="h-[90px] top-[68px] right-[10px] absolute transform translate-y-[-70%] z-[-1]"
          src={mushroomsGrass}
          alt="bg-mission-body"
        />
        <img
          className="h-[65px] object-contain top-[70px] left-[10px] absolute transform translate-y-[-70%] z-[10]"
          src={tussock}
          alt="bg-mission-body"
        />
        {/* <BaseAction
          onClick={() => {}}
          className="h-[90px] top-[80px] right-[55px] absolute transform translate-y-[-70%] z-[10] rotate-90"
        >
          <div className="relative flex justify-center items-center">
            <img src={backgroundShort} className="h-16 w-9 absolute z-[-10]" />
            <div className=" -rotate-90">
              <span className="text-t-button font-bold">History</span>
            </div>
          </div>
        </BaseAction> */}
      </div>
    </div>
  );
}
