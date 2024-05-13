/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "@/config";
import axios from "axios";
import qs from "qs";
interface IProps {
  address: string;
  publicKey: string;
  step?: number;
}

const AccountRepository = {
  getFirstRegister: async ({ address, publicKey }: IProps) => {
    const res = await axios.post(`${config.apiUrl}/game/first-register`, {
      address,
      publicKey,
    });
    return res.data || {};
  },
  completeMission: async ({ address, publicKey, step }: IProps) => {
    const res = await axios.post(`${config.apiUrl}/game/complete-mission`, {
      address,
      publicKey,
      step,
    });
    return res.data || {};
  },
  getRef: async ({ address }: any) => {
    const query = qs.stringify(
      {
        populate: {
          inviteBy: {
            fields: ["wallet"],
          },
        },
        filters: {
          inviteBy: {
            wallet: {
              $eq: address,
            },
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    const res = await axios.get(`${config.apiUrl}/references?${query}`);
    return res.data || {};
  },
};
export default AccountRepository;
