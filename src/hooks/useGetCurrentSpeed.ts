import { RootState } from "@/store/store";
import { useMemo } from "react"
import { useSelector } from "react-redux";

export default function useCurrentSpeed() {
    const { mining, boosts } = useSelector((s: RootState) => s.miningStore);
    const { speedLevel } = mining ?? {}
    const { speed = 0 } = speedLevel ?? {}
    const currentSpeed = useMemo(() => {
        return speed + boosts?.reduce((acc, boost) => {
            return acc + (boost.isActive ? (boost.bonusSpeed ?? 0) : 0)
        }, 0)
    }, [boosts, speed])
    return currentSpeed
}