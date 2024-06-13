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
        "rounded-xl pb-2 px-3 bg-b-primary active:opacity-75 duration-100 active:scale-[0.95] text-t-light leading-none pt-3 font-lalezar " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}
