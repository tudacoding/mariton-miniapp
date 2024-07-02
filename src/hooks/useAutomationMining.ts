/* eslint-disable react-hooks/exhaustive-deps */
import { RootState } from "@/store/store";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function useAutomationMining() {
    let interval: NodeJS.Timeout;
    const { mining, sending } = useSelector((s: RootState) => s.miningStore);
    const { miningLevel, claimTime, endMiningTime, minedTokens, lastBoostTime } = mining ?? {}
    const { speed = 0 } = miningLevel ?? {}
    const [countTime, setCountTime] = useState(0)
    const resetMining = () => {
        setCountTime(0)
    }
    const clearIntervalMining = () => {
        clearInterval(interval)
    }
    const countStopMining = useMemo(() => {
        if (!endMiningTime) return 0
        const currentTime = new Date().getTime();
        const countEndTime = new Date(endMiningTime).getTime();
        const time = countEndTime - currentTime;
        return time > 0 ? time : 0
    }, [endMiningTime])

    const currentAmount = useMemo(() => {
        if (!claimTime) return 0;

        const countStartTime = lastBoostTime ? new Date(lastBoostTime).getTime() : new Date(claimTime).getTime();
        const countEndTime = countStopMining ? new Date().getTime() : new Date(endMiningTime).getTime();

        const elapsedTimeInSeconds = Math.floor((countEndTime > countStartTime ? countEndTime - countStartTime : 0) / 1000);
        const earnedTokens = elapsedTimeInSeconds * (speed / 3600);
        setCountTime(0)
        return earnedTokens + minedTokens;
    }, [claimTime, minedTokens])

    useEffect(() => {
        if (claimTime && countStopMining > 0) {
            interval = setInterval(() => {
                setCountTime(countTime + 1000);
            }, 1000);
            if (countTime >= countStopMining) {
                clearInterval(interval)
            }
            return () => clearInterval(interval);
        }
    }, [countTime, claimTime, countStopMining]);

    const amount = (sending ? 0 : (currentAmount + (countTime / 1000) * (speed / 3600))).toFixed(6)
    return { amount, resetMining, clearIntervalMining }
}