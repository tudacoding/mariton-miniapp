/* eslint-disable react-hooks/exhaustive-deps */
import { RootState } from "@/store/store";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import useCurrentSpeed from "./useGetCurrentSpeed";
import { formatNumber } from "@/helpers";

export default function useAutomationMining() {
    let interval: NodeJS.Timeout;
    const { mining, sending } = useSelector((s: RootState) => s.miningStore);
    const { claimTime, endMiningTime, minedTokens, lastBoostTime } = mining ?? {}
    // const test = {
    //     "id": 71,
    //     "minedTokens": 0,
    //     "claimTime": "2024-07-26T20:09:48.835Z",
    //     "createdAt": "2024-07-26T20:09:48.998Z",
    //     "updatedAt": "2024-07-26T20:09:48.998Z",
    //     "endMiningTime": "2024-07-27T00:09:48.836Z",
    //     "lastBoostTime": null,
    //     "friendClaimTokens": 0,
    //     "speedLevel": {
    //         "id": 37,
    //         "level": "1",
    //         "speed": 0.1,
    //         "log": {},
    //         "mrtNextCost": 2.5,
    //         "mrtNextSpeedIncreased": 0.01,
    //         "tonNextCost": 0.1,
    //         "missionFriendsLevel": 0,
    //         "createdAt": "2024-07-26T20:09:48.837Z",
    //         "updatedAt": "2024-07-26T20:09:48.837Z"
    //     },
    // }
    // const { claimTime, endMiningTime, minedTokens, lastBoostTime } = test
    const [countTime, setCountTime] = useState(0)
    const currentSpeed = useCurrentSpeed();

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
        const earnedTokens = elapsedTimeInSeconds * (currentSpeed / 3600);
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

    const amount = sending ? '0.000000' : (currentAmount + (countTime / 1000) * (currentSpeed / 3600)).toFixed(6)
    return { amount, resetMining, clearIntervalMining }
}