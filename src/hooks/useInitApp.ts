import interceptorSetup from "@/api/interceptor";
import { useEffect } from "react";

export default function useInitApp() {
    useEffect(() => {
        interceptorSetup();
        if (window.Telegram) {
            window.Telegram.WebApp?.ready();
            console.log('Init data:', window.Telegram?.WebApp?.initData);
            console.log('Init data unsafe:', window.Telegram?.WebApp?.initDataUnsafe);
        }
    }, []);
}