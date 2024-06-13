import { useEffect, useState } from "react";

export default function useAutomationMining(speed: number, currentValue: number) {
    const [amount, setAmount] = useState(currentValue ?? 0)
    useEffect(() => {
        const interval = setInterval(() => {
            setAmount(amount + speed / 3600);
        }, 1000);
        return () => clearInterval(interval);
    }, [amount, speed]);
    return { amount: amount.toFixed(6) }
}