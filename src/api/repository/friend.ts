import config from "@/config";
import axios from "axios";
import qs from "qs";
const FriendRepository = {
    fetchFriends: async (userId: number) => {
        const query = qs.stringify(
            {
                filters: {
                    invitebyId: {
                        $eq: userId,
                    }
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
