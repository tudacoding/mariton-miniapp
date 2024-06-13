import ActionBar from "@/modules/home/ActionBar";
import bgArena from "@/assets/game/background-arena.png";
const ArenaScreen = () => {
  return (
    <div className="h-screen relative overflow-auto">
      <ActionBar/>
      <div className="flex flex-col justify-center p-4 pt-[60px]">
        <img src={bgArena} alt="bg-arena" />
      </div>
    </div>
  );
};

export default ArenaScreen;
