import BaseCard from "@/components/BaseCard";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import boostLogo from "@/assets/air/air-logo-friend.png";

export default function ListRefs() {
  const { refs } = useSelector((s: RootState) => s.accountStore);
  return (
    <div>
      {refs.map(({ username, avatar }, index) => {
        return (
          <div key={index} className="pb-3">
            <BaseCard
              avatar={avatar ?? boostLogo}
              title={username}
              description={""}
              onClick={() => {}}
              actionComponent={
                <div className="border border-0.5 border-solid rounded-full h-6 w-6 border-t-description"></div>
              }
            ></BaseCard>
          </div>
        );
      })}
    </div>
  );
}
