import Loading from "@/assets/icons/Loading";
import MaritonToken from "@/assets/icons/MaritonToken";
import Success from "@/assets/icons/Success";
import BaseButton from "@/components/BaseButton";
import BaseCard from "@/components/BaseCard";
import { formatDate } from "@/helpers";
import { ITransaction } from "@/types/models/transaction";
interface ITransactionCard {
  transaction: ITransaction;
  onClick?: () => void;
}
export default function TransactionCard({
  transaction,
  onClick = () => {},
}: ITransactionCard) {
  return (
    <BaseCard
      title={
        <div className="flex flex-row gap-1 items-center">
          <p className="text-t-title font-bold text-base leading-none pb-1">
            {`-${(Number(transaction.amount) / 1000000000).toFixed(3)}`}
          </p>
          <MaritonToken className="mb-1" />
        </div>
      }
      description={formatDate(transaction.createdAt)}
      actionComponent={
        <ActionTransactionCard onClick={onClick} isDone={transaction.isDone} />
      }
    ></BaseCard>
  );
}
function ActionTransactionCard({
  isDone,
  onClick,
}: {
  isDone: boolean | "pending";
  onClick: () => void;
}) {
  switch (isDone) {
    case true:
      return <Success className="h-6 w-6 mx-4" />;
    case "pending":
      return <Loading className="text-primary w-6 h-6 mx-4"/>;
    default:
      return (
        <BaseButton
          onClick={onClick}
          className="pt-[5px] pb-[2px] px-[14px] rounded-2xl text-xs text-t-title font-bold"
        >
          Claim
        </BaseButton>
      );
  }
}
