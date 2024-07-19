import BaseCard from "@/components/BaseCard";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function ListFriend() {
  const { friends } = useSelector((s: RootState) => s.miningStore);
  return (
    <div>
      {friends.map(({ attributes }, index) => {
        const { first_name, last_name } = attributes;
        return (
          <div key={index} className="pb-3">
            <BaseCard
              title={`${first_name} ${last_name}`}
              description={"Sent a friend request"}
              onClick={() => {}}
            ></BaseCard>
          </div>
        );
      })}
    </div>
  );
}
