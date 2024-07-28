import BaseCard from "@/components/BaseCard";
import { getUserName } from "@/hooks/useGetInforTelegram";
import { RootState } from "@/store/store";
import { memo } from "react";
import { useSelector } from "react-redux";

export default memo(function ListFriend() {
  const { friends } = useSelector((s: RootState) => s.miningStore);
  return (
    <div>
      {friends.map(({ attributes }, index) => {
        const { first_name, last_name, username } = attributes;
        return (
          <div key={index} className="pb-3">
            <BaseCard
              title={`${getUserName({ first_name, last_name, username })}`}
              description={"Joined via your Invite Link"}
              onClick={() => {}}
            ></BaseCard>
          </div>
        );
      })}
    </div>
  );
});
