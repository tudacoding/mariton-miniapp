import { PropsWithChildren } from "react";
import BaseDivider from "./BaseDivider";

export default function BaseTitleDivider({ children }: PropsWithChildren) {
  return (
    <div className="text-center flex flex-row justify-center items-center gap-3 py-3">
      <BaseDivider />
      <span className="text-t-description text-base font-semibold bg-transparent whitespace-nowrap">
        {children}
      </span>
      <BaseDivider />
    </div>
  );
}
