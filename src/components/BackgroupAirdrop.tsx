import background from "@/assets/air/background-body-short.png";
import mushroomsGrass from "@/assets/air/mushrooms-and-grass.png";
import tussock from "@/assets/air/tussock.png";

export default function BackgroundAirdrop() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full relative pt-[62px]">
        <img className="w-full h-full" src={background} alt="bg-mission-body" />
        <img
          className="h-[90px] top-[62px] right-[10px] absolute transform translate-y-[-70%] z-[-1]"
          src={mushroomsGrass}
          alt="bg-mission-body"
        />
        <img className="h-[65px] object-contain top-[62px] left-[10px] absolute transform translate-y-[-70%] z-[10]" src={tussock} alt="bg-mission-body" />
      </div>
    </div>
  );
}
