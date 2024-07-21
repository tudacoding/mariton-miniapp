import TransactionCard from "./TransactionCard";
import { ITransaction } from "@/types/models/transaction";

export default function ListTransactions({
  transactions,
}: {
  transactions: ITransaction[];
}) {

  return (
    <div className="flex flex-col gap-3">
      {transactions.map((transaction: any) => {
        return (
          <TransactionCard key={transaction.id} transaction={transaction} />
        );
      })}
    </div>
  );
}
