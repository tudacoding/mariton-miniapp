import { twMerge } from "tailwind-merge";

interface IBaseButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}
export default function BaseButton({
  children,
  className = "",
  disabled = false,
  ...props
}: IBaseButton) {
  return (
    <button
      disabled={disabled}
      className={twMerge(
        "rounded-xl pb-2 px-3 text-t-light leading-none pt-3 font-lalezar",
        disabled && "bg-b-primary/80 opacity-70",
        !disabled &&
          "bg-b-primary active:opacity-75 duration-100 active:scale-[0.95]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
