import { twJoin } from "tailwind-merge";

export default function BaseAction({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={twJoin(
        "cursor-pointer active:opacity-75 duration-100 active:scale-[0.95]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
