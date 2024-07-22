import TransactionCard from "./TransactionCard";
import { ITransaction } from "@/types/models/transaction";

export default function ListTransactions({
  transactions,
  claimToken,
}: {
  transactions: ITransaction[];
  claimToken: (transaction: ITransaction) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {transactions.map((transaction: any) => {
        return (
          <TransactionCard
            onClick={() => claimToken(transaction)}
            key={transaction.id}
            transaction={transaction}
          />
        );
      })}
    </div>
  );
}
