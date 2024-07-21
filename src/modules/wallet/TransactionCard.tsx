import Loading from "@/assets/icons/Loading";
import MaritonToken from "@/assets/icons/MaritonToken";
import Success from "@/assets/icons/Success";
import BaseCard from "@/components/BaseCard";
import { ITransaction } from "@/types/models/transaction";
interface ITransactionCard {
  transaction: ITransaction;
}
export default function TransactionCard({ transaction }: ITransactionCard) {
  return (
    <BaseCard
      title={
        <div className="flex flex-row gap-1 items-center">
          <p className="text-t-title font-bold text-base leading-none pb-1">
            {`-${(Number(transaction.amount) / 1000000000).toFixed(3)} mrt`}
          </p>
          <MaritonToken className="mb-1"/>
        </div>
      }
      description={transaction.createdAt}
      actionComponent={
        true ? <Success className="h-6 w-6" /> : <Loading className="h-6 w-6" />
      }
    ></BaseCard>
  );
}
