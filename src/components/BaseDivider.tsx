export default function BaseDivider({ className }: { className?: string }) {
  return <div className={"w-full h-[2px] bg-[#DAD8B7] " + className}></div>;
}
