import { useEffect, useMemo, useState } from "react";

export default function useAutomationMining(speed: number, timeStart?: string) {
    const [amount, setAmount] = useState(0)
    const currentAmount = useMemo(() => {
        if (!timeStart) return 0
        const specificTime = new Date(timeStart).getTime();
        const now = new Date().getTime();
        return Math.floor((now - specificTime) / 1000) * (speed / 3600);
    }, [timeStart, speed])

    useEffect(() => {
        if (timeStart) {
            const interval = setInterval(() => {
                setAmount(amount + speed / 3600);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [amount, speed, timeStart]);

    return { amount: (currentAmount + amount).toFixed(6) }
}