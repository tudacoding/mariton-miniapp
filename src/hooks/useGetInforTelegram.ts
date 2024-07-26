import { get } from "lodash-es";

export default function useGetInforTelegram() {
    const { first_name, last_name, id, avatar, username } = get(window, "Telegram.WebApp.initDataUnsafe.user", {}) as any;
    const telegramName = username ?? ((first_name || last_name) ? first_name ?? `${first_name} ` + (last_name ?? '') : undefined);
    return {
        telegramName, first_name, last_name, id, avatar, username
    }
}