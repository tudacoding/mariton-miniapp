import config from "@/config";
import axios from "axios";
import qs from "qs";
interface IProps {
  address: string;
  publicKey: string;
}

interface IPropsHistoryLottery {
  wallet: string;
  pagination: {
    page: number;
    pageSize: number;
  };
}

const SpinRepository = {
  spinLottery: async ({ address, publicKey }: IProps) => {
    const res = await axios.post(`${config.apiUrl}/game/spin-lottery`, {
      address,
      publicKey,
    });
    return res.data || {};
  },
  getHistoryLottery: async ({ wallet, pagination }: IPropsHistoryLottery) => {
    const query = qs.stringify(
      {
        pagination: {
          page: pagination.page,
          pageSize: pagination.pageSize,
        },
        populate: {
          account: {
            fields: ["wallet"],
          },
          lottery_item: {
            fields: ["type", "value"],
          },
        },
        filters: {
          account: {
            wallet: {
              $eq: wallet,
            },
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    const res = await axios.get(`${config.apiUrl}/history-lotteries?${query}`);
    return res.data || {};
  },
};
export default SpinRepository;
