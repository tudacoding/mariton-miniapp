import { PropsWithChildren } from "react";
import BaseDivider from "./BaseDivider";
import { twMerge } from "tailwind-merge";

export default function BaseTitleDivider({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  return (
    <div
      className={twMerge(
        "text-center flex flex-row justify-center items-center gap-3 py-3",
        className
      )}
    >
      <BaseDivider />
      <span className="text-t-description text-base font-semibold bg-transparent whitespace-nowrap">
        {children}
      </span>
      <BaseDivider />
    </div>
  );
}
