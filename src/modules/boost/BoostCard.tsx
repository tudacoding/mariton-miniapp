import Success from "@/assets/icons/Success";
import BaseCard from "@/components/BaseCard";
import BoostDialog from "../home-dialog/BoostDialog";
import { EDailyType } from "@/types/models/mining";
import useGetInforTelegram from "@/hooks/useGetInforTelegram";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { toast } from "react-toastify";
import { KEY_MARITON_AMBASSADOR } from "@/config";
export interface BoostCardProps {
  title: string;
  sortDescription: string;
  icon: JSX.Element;
  type: EDailyType;
  description?: string | JSX.Element;
}
export default function BoostCard({
  index,
  item,
  isActive,
  isCustomAvatar = false,
}: {
  index: number;
  item: BoostCardProps;
  isActive?: boolean;
  isCustomAvatar?: boolean;
}) {
  const { title, sortDescription, icon, type } = item;
  const { first_name, last_name } = useGetInforTelegram();
  const { miningStore } = useDispatch<Dispatch>();
  const { account } = useSelector((s: RootState) => s.accountStore);

  const handleMaritonAmbassador = async ({
    type,
    sortDescription,
  }: {
    type: EDailyType;
    sortDescription: string;
  }) => {
    if (
      ((first_name ?? "") + (last_name ?? ""))?.includes(KEY_MARITON_AMBASSADOR)
    ) {
      const res = await miningStore.boostDaily({
        userId: account?.id,
        type,
      });
      if (res) {
        toast.success(sortDescription);
        return true;
      }
    } else {
      toast.error(
        `You need add '${KEY_MARITON_AMBASSADOR}' to your Telegram name`
      );
    }
    return false;
  };
  const handleBoost = async () => {
    let result = false;
    if (!isActive && account.id) {
      if (type === EDailyType.MARITON_AMBASSADOR) {
        result = await handleMaritonAmbassador(item);
      } else if (
        [EDailyType.CHECKIN, EDailyType.JUNIOR_RICH_MARITON].includes(type)
      ) {
        result = await miningStore.boostDaily({
          userId: account.id,
          type,
        });
        if (result) {
          toast.success(sortDescription);
        }
      } else {
        //one time checkin
        result = await miningStore.boostOneTime({
          userId: account.id,
          type,
        });
      }
    }
    return result;
  };
  return (
    <div key={index} className="pb-3">
      <BaseCard
        title={title}
        description={sortDescription}
        avatar={icon}
        isCustomAvatar={isCustomAvatar}
        actionComponent={
          isActive ? (
            <Success className="h-6 w-6 mx-3" />
          ) : (
            <BoostDialog
              id={`boost_${index}`}
              item={item}
              onAction={async () => await handleBoost()}
            />
          )
        }
      ></BaseCard>
    </div>
  );
}
