import { get } from "lodash-es";
export const getUserName = ({ first_name, last_name, username }: {
    first_name: string, last_name: string, username: string
}) => username ?? ((first_name || last_name) ? first_name ?? `${first_name} ` + (last_name ?? '') : undefined)
export default function useGetInforTelegram() {
    const { first_name, last_name, id, avatar, username } = get(window, "Telegram.WebApp.initDataUnsafe.user", {}) as any;
    const telegramName = getUserName({ first_name, last_name, username });
    return {
        telegramName, first_name, last_name, id, avatar, username
    }
}