import MaritonToken from "@/assets/icons/MaritonToken";
import Minus from "@/assets/icons/Minus";
import Plus from "@/assets/icons/Plus";
import TonToken from "@/assets/icons/TonToken";
import BaseAction from "@/components/BaseAction";
import BaseButton from "@/components/BaseButton";
import BaseDivider from "@/components/BaseDivider";
import { useState } from "react";

export default function FormCard({
  onSubmit,
  type,
  title,
  maxValue,
}: {
  onSubmit: (value: number) => void;
  type: "TON" | "MRT" | "CLAIM_MRT";
  title: string;
  maxValue: number;
}) {
  const [value, setValue] = useState<number | string>(0);
  const numberValue = Number(value ?? 0);
  return (
    <div className="p-4  rounded-2xl bg-light">
      <div className="flex flex-row justify-center items-center gap-2">
        {type === "TON" ? (
          <TonToken className="" />
        ) : (
          <MaritonToken className="" />
        )}
        <p className="text-t-button text-[16px] font-bold text-center">
          {title}
        </p>
      </div>
      <BaseDivider className="h-[1px] bg-t-description my-5" />
      <div className="flex flex-row gap-6">
        <div className="flex flex-row justify-center gap-3 items-center">
          <BaseAction>
            <Minus
              onClick={() => {
                if (numberValue - 1 >= 0) setValue(numberValue - 1);
              }}
            />
          </BaseAction>
          <div className="relative">
            <input
              className="bg-primary rounded-2xl py-1 pl-2 pr-10 w-[120px] text-white"
              value={value}
              onChange={(event) => {
                const newValue = event.target.value.replace(/[^\d.]/g, "");
                setValue(newValue);
              }}
            />
            <BaseAction
              className="absolute top-0 right-0 text-t-description bg-light rounded-2xl px-1 text-[12px] font-semibold translate-x-[-20%] translate-y-[40%]"
              onClick={() => {
                setValue(maxValue);
              }}
            >
              Max
            </BaseAction>
          </div>
          <BaseAction>
            <Plus onClick={() => setValue(numberValue + 1)} />
          </BaseAction>
        </div>
        <BaseButton
          disabled={numberValue === 0}
          onClick={() => {
            if (numberValue) onSubmit(numberValue);
          }}
          className="w-[80px] px-1 bg-success"
        >
          {type === "CLAIM_MRT" ? "Withdraw" : "Deposit"}
        </BaseButton>
      </div>
    </div>
  );
}
