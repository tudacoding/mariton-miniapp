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
                const res = await TransactionResource.fetchTransactions({ wallet })
                if (res?.data?.length > 0) {
                    const data = res.data.map((item: any) => {
                        return {
                            ...item.attributes, id: item.id
                        }
                    })
                    dispatch.transactionStore.setTransactions(data)
                    return res
                }

            }

        }

    })
})
export default transactionStore;