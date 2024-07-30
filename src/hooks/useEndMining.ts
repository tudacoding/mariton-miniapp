import MiningRepository from "@/api/repository/minning";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useEndMining() {
    const { mining } = useSelector((s: RootState) => s.miningStore)
    const id = mining?.id
    useEffect(() => {
        if (id) {
            const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
                try {
                    MiningRepository.endMining(id)
                } catch (error) {
                    console.error("Error sending API request:", error);
                }
                e.preventDefault();
                e.returnValue = "";
            };
            window.addEventListener("beforeunload", handleBeforeUnload);
            return () => {
                window.removeEventListener("beforeunload", handleBeforeUnload);
            };
        }
    }, [id]);
}