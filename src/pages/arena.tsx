import ActionBar from "@/modules/home/ActionBar";
import bgArena from "@/assets/game/background-arena.png";
import closeButton from "@/assets/game/close-button.png";
import { useNavigate } from "react-router-dom";
const ArenaScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <ActionBar />
      <div className="flex flex-col justify-center p-4">
        <img src={bgArena} alt="bg-arena" />
        <div className="relative flex justify-center">
          <img
            onClick={() => {
              navigate("/");
            }}
            width={80}
            className="absolute bottom-0 hover:opacity-50 cursor-pointer"
            src={closeButton}
            alt="bg-shop"
          />
        </div>
      </div>
    </div>
  );
};

export default ArenaScreen;
