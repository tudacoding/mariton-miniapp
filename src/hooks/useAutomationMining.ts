/* eslint-disable react-hooks/exhaustive-deps */
import { RootState } from "@/store/store";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function useAutomationMining() {
    let interval: NodeJS.Timeout;
    const { mining } = useSelector((s: RootState) => s.miningStore);
    const { speed = 0, claimTime, endMiningTime, minedTokens, lastBoostTime } = mining ?? {}
    const [countTime, setCountTime] = useState(0)

    const resetMining = () => {
        setCountTime(0)
    }
    const clearIntervalMining = () => {
        clearInterval(interval)
    }
    const countStopMining = useMemo(() => {
        const currentTime = new Date().getTime();
        const countEndTime = new Date(endMiningTime).getTime();
        const time = countEndTime - currentTime;
        return time > 0 ? time : 0
    }, [endMiningTime])

    const currentAmount = useMemo(() => {
        if (!claimTime) return 0;

        const countCurrentTime = new Date().getTime();
        const countStartTime = lastBoostTime ? new Date(lastBoostTime).getTime() : new Date(claimTime).getTime();

        const elapsedTimeInSeconds = Math.floor((countCurrentTime - countStartTime) / 1000);
        const earnedTokens = elapsedTimeInSeconds * (speed / 3600);
        setCountTime(0)
        return earnedTokens + minedTokens;
    }, [claimTime, minedTokens])

    useEffect(() => {
        if (claimTime) {
            interval = setInterval(() => {
                setCountTime(countTime + 1000);
            }, 1000);
            if (countTime >= countStopMining) {
                clearInterval(interval)
            }
            return () => clearInterval(interval);
        }
    }, [countTime, claimTime]);
    const amount = (currentAmount + ((countTime / 1000) * (speed / 3600))).toFixed(6)
    return { amount, resetMining, clearIntervalMining }
}