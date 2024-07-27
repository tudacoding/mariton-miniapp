import BaseCard from "@/components/BaseCard";
import { getUserName } from "@/hooks/useGetInforTelegram";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function ListFriend() {
  const { friends } = useSelector((s: RootState) => s.miningStore);
  return (
    <div>
      {friends.map(({ attributes }, index) => {
        const { first_name, last_name, username } = attributes;
        return (
          <div key={index} className="pb-3">
            <BaseCard
              title={`${getUserName({ first_name, last_name, username })}`}
              description={"Sent invite link"}
              onClick={() => {}}
            ></BaseCard>
          </div>
        );
      })}
    </div>
  );
}
