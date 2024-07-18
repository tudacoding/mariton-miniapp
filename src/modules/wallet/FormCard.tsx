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
}: {
  onSubmit: (value: number) => void;
  type: "TON" | "MRT" | "CLAIM_MRT";
  title: string;
}) {
  const [value, setValue] = useState<number | string>(0);
  return (
    <div className="p-4  rounded-2xl bg-light">
      <p className="text-t-button text-[16px] font-bold text-center">{title}</p>
      <BaseDivider className="h-[1px] bg-t-description my-4" />
      <div className="flex flex-row gap-6">
        <div className="flex flex-row justify-center gap-3 items-center">
          <BaseAction>
            <Minus
              onClick={() => {
                if (Number(value) > 0) setValue(Number(value ?? 0) - 1);
              }}
            />
          </BaseAction>
          <div className="relative">
            <input
              className="bg-primary rounded-2xl py-1 pl-2 pr-8 w-28"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            />
            {type === "TON" ? (
              <TonToken className="absolute top-[0] right-0 m-2 focus:!border-none focus:!shadow-none" />
            ) : (
              <MaritonToken className="absolute top-[0] right-0 m-2 focus:!border-none focus:!shadow-none" />
            )}
          </div>
          <BaseAction>
            <Plus onClick={() => setValue(Number(value ?? 0) + 1)} />
          </BaseAction>
        </div>
        <BaseButton
          onClick={() => {
            onSubmit(Number(value));
          }}
        >
          {type === "CLAIM_MRT" ? "Claim" : "Deposit"}
        </BaseButton>
      </div>
    </div>
  );
}
