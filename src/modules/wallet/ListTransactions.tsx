import TransactionCard from "./TransactionCard";
import { ITransaction } from "@/types/models/transaction";

export default function ListTransactions({
  transactions,
  claimToken,
}: {
  transactions: ITransaction[];
  claimToken: (transaction: ITransaction, index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {transactions.map((transaction: ITransaction, index: number) => {
        return (
          <TransactionCard
            onClick={() => claimToken(transaction, index)}
            key={transaction.id}
            transaction={transaction}
          />
        );
      })}
    </div>
  );
}
