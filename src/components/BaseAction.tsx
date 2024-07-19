import { twJoin } from "tailwind-merge";

export default function BaseAction({
  children,
  className,
  disable,
  onClick = () => {},
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  disable?: boolean;
}) {
  return (
    <div
      className={twJoin(
        !disable &&
          "cursor-pointer active:opacity-75 duration-100 active:scale-[0.95]",
        disable && "cursor-not-allowed opacity-75",
        className
      )}
      onClick={(event) => {
        !disable && onClick(event);
      }}
      {...props}
    >
      {children}
    </div>
  );
}
