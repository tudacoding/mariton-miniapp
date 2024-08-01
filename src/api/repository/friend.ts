import config from "@/config";
import axios from "axios";
import qs from "qs";
const FriendRepository = {
    fetchFriends: async ({ userId, page = 0, size = 10 }: { userId?: number, page?: number, size?: number }) => {
        const query = qs.stringify(
            {
                filters: {
                    invitebyId: {
                        $eq: userId,
                    }
                },
                pagination: {
                    page,
                    pageSize: size
                },
            },
            {
                encodeValuesOnly: true,
            }
        );
        const res = await axios.get(`${config.apiUrl}/friends?${query}`);
        return res.data || {};
    }
};
export default FriendRepository;
