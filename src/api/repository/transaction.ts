import config from "@/config";
import axios from "axios";
import qs from "qs";

const TransactionResource = {
    async getTransactionsWithWallet({ wallet }: any) {
        const res = await axios.get(`${config.apiUrl}/transaction/transaction-with-wallet?wallet=${wallet}`);
        return res.data || [];
    },
    async fetchTransactions(data: any) {
        const query = qs.stringify({
            filters: {
                wallet: data.wallet
            }
        });
        const res = await axios.get(`${config.apiUrl}/transactions?${query}&sort[0]=createdAt:desc&pagination[limit]=20`);
        return res.data || [];
    }
}
export default TransactionResource;