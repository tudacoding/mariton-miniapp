import Loading from "@/assets/icons/Loading";
import Success from "@/assets/icons/Success";
import BaseCard from "@/components/BaseCard";
import { ITransaction } from "@/types/models/transaction";
interface ITransactionCard {
  transaction: ITransaction;
}
export default function TransactionCard({ transaction }: ITransactionCard) {
  return (
    <BaseCard
      title={`-${(Number(transaction.amount) / 1000000000).toFixed(3)} mrt`}
      description={transaction.createdAt}
      actionComponent={true ? <Success className="h-6 w-6" /> : <Loading className="h-6 w-6" />}
    ></BaseCard>
  );
}
