import Mission1 from "@/assets/images/mission/Mission1.svg";
import Mission2 from "@/assets/images/mission/Mission2.svg";
import Mission6 from "@/assets/images/mission/Mission3.svg";
import Mission5 from "@/assets/images/mission/Mission4.svg";
import Mission4 from "@/assets/images/mission/Mission5.svg";
import Mission3 from "@/assets/images/mission/Mission6.svg";
import Mission7 from "@/assets/images/mission/Mission7.svg";
export default function MissionAvatar({ index }: { index: number }) {
  switch (index) {
    case 1:
      return <img src={Mission1} alt="mission1" />;
    case 2:
      return <img src={Mission2} alt="mission2" />;
    case 3:
      return <img src={Mission3} alt="mission3" />;
    case 4:
      return <img src={Mission4} alt="mission4" />;
    case 5:
      return <img src={Mission5} alt="mission5" />;
    case 6:
      return <img src={Mission6} alt="mission6" />;
    case 7:
      return <img src={Mission7} alt="mission7" />;
    default:
      return <img src={Mission1} alt="mission1" />;
  }
}
