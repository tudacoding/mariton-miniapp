interface IBaseButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}
export default function BaseButton({ children, ...props }: IBaseButton) {
  return <button className="rounded-xl py-2 px-3 bg-b-primary active:opacity-75 duration-100 active:scale-105" {...props}>{children}</button>;
}
