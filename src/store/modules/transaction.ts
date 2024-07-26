import { createModel } from "@rematch/core";
import { RootModel } from "..";
import TransactionResource from "@/api/repository/transaction";
import { ITransaction } from "@/types/models/transaction";
interface State {
    transactions: { [key: string]: ITransaction };
}
const transactionStore = createModel<RootModel>()({
    state: {
        transactions: {},
        intervalFetch: false
    } as State,
    reducers: {
        setTransactions(state, transactions) {
            return { ...state, transactions }
        },
    },
    effects: (dispatch) => ({
        fetchTransactions: async (wallet) => {
            if (wallet) {
                const res = await TransactionResource.fetchTransactions({ wallet })
                if (res?.data?.length > 0) {
                    const transactionPendings: { [key: string]: boolean } = JSON.parse(localStorage.getItem("transactionPendings") || "{}");

                    const data = res.data.reduce((accumulator: any, currentValue: any) => {
                        accumulator[currentValue.id] = {
                            ...currentValue.attributes, id: currentValue.id,
                            isDone: transactionPendings[currentValue.id] ? 'pending' : currentValue.attributes.isDone
                        }
                        return accumulator
                    }, {})
                    dispatch.transactionStore.setTransactions(data)
                    return data
                }

            }

        }

    })
})
export default transactionStore;