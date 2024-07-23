import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import BaseAvatar from "./BaseAvatar";

interface IBaseCard {
  title: string | ReactElement;
  description?: string;
  avatar?: ReactElement;
  onClick?: () => void;
  actionComponent?: ReactElement;
  highlight?: boolean;
  selected?: boolean;
}
export default function BaseCard({
  title,
  description,
  onClick = () => {},
  actionComponent,
  highlight,
  avatar,
}: IBaseCard) {
  const isTitleString = typeof title === "string";
  return (
    <div
      className={twMerge(
        "w-full rounded-xl bg-card p-[14px] flex flex-row gap-3",
        highlight && ""
      )}
      onClick={onClick}
    >
      <BaseAvatar
        name={isTitleString ? title : ""}
        children={avatar}
      ></BaseAvatar>

      <div className="grow">
        {isTitleString ? (
          <p className="text-t-title font-bold text-base leading-none pb-1">
            {title}
          </p>
        ) : (
          title
        )}
        <p className="text-t-description font-medium text-xs leading-none">
          {description}
        </p>
      </div>
      <div className="flex justify-center items-center">{actionComponent}</div>
    </div>
  );
}
