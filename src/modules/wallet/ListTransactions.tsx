import TransactionCard from "./TransactionCard";
import { ITransaction } from "@/types/models/transaction";

export default function ListTransactions({
  transactions,
  claimToken,
}: {
  transactions: { [key: string]: ITransaction };
  claimToken: (transaction: ITransaction, index: string | number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {Object.entries(transactions).map(([key, transaction]) => {
        return (
          <TransactionCard
            onClick={() => claimToken(transaction, key)}
            key={transaction.id}
            transaction={transaction}
          />
        );
      })}
    </div>
  );
}
