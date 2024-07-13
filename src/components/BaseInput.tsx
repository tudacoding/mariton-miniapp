interface BaseInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}
export default function BaseInput({ ...props }: BaseInputProps) {
  return (
    <input
      type="text"
      placeholder="Amount"
      className="input input-bordered w-full max-w-xs"
      {...props}
    />
  );
}
