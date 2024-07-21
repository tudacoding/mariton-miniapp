import { createModel } from "@rematch/core";
import { RootModel } from "..";
import TransactionResource from "@/api/repository/transaction";
import { ITransaction } from "@/types/models/transaction";
interface State {
    transactions: ITransaction[];
}
const transactionStore = createModel<RootModel>()({
    state: {
        transactions: []
    } as State,
    reducers: {
        setTransactions(state, transactions) {
            return { ...state, transactions }
        },
    },
    effects: (dispatch) => ({
        getTransactions: async (wallet) => {
            if (wallet) {
                const res = await TransactionResource.getTransactionsWithWallet({ wallet })
                dispatch.transactionStore.setTransactions(res)
                return res
            }

        }

    })
})
export default transactionStore;