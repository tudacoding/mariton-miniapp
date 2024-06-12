import { ReactElement } from "react";

interface IBaseCard {
  title: string;
  description?: string;
  avatar?: string;
  onClick?: () => void;
  actionComponent?: ReactElement;
}
export default function BaseCard({
  title,
  description,
  avatar,
  onClick = () => {},
  actionComponent,
}: IBaseCard) {
  return (
    <div
      className="w-full rounded-xl bg-card p-[14px] flex flex-row gap-3"
      onClick={onClick}
    >
      <div className="h-10 w-10 border-2 border-solid border-primary rounded-full overflow-hidden">
        <img className="h-full w-full object-cover" alt="" src={avatar} />
      </div>
      <div className="grow">
        <p className="text-t-title font-bold text-base leading-none pb-1">
          {title}
        </p>
        <p className="text-t-description font-medium text-xs leading-none">
          {description}
        </p>
      </div>
      <div className="flex justify-center items-center">{actionComponent}</div>
    </div>
  );
}
