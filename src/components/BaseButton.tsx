interface IBaseButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}
export default function BaseButton({
  children,
  className,
  ...props
}: IBaseButton) {
  return (
    <button
      className={
        "rounded-xl py-2 px-3 bg-b-primary active:opacity-75 duration-100 active:scale-[1.02] text-t-light leading-1 " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}
