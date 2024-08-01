import BaseCard from "@/components/BaseCard";
import { getUserName } from "@/hooks/useGetInforTelegram";
import { Dispatch, RootState } from "@/store/store";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "@/assets/icons/Loading";

export default memo(function ListFriend() {
  const { friends, countFriends } = useSelector(
    (s: RootState) => s.miningStore
  );
  const { paginationFriends } = useDispatch<Dispatch>().miningStore;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const handelPagination = async () => {
    if (friends.length >= countFriends) {
      setLoading(false);
    } else {
      setLoading(true);
      await paginationFriends({
        page,
        size: 10,
      });
      setPage(page + 1);
    }
  };
  return (
    <div
      id="scrollableDiv"
      className="overflow-y-auto overflow-clip grow pt-2 overflow-x-[unset]"
    >
      <InfiniteScroll
        dataLength={friends.length}
        next={handelPagination}
        scrollableTarget="scrollableDiv"
        hasMore={true}
        loader={
          <div className="flex justify-center pb-2">
            {loading && <Loading className="h-6 w-6 text-t-button" />}
          </div>
        }
      >
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
      </InfiniteScroll>
    </div>
  );
});
