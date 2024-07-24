const RattingRef = ({ amount, index }: { amount: number; index: number }) => {
  switch (index) {
    case 0:
      return (
        <div className="flex flex-row justify-center items-center gap-1 text-[22px] font-bold text-t-button">
          <span>{amount}</span>
        </div>
      );
    case 1:
      return (
        <div className="flex flex-row justify-center items-center gap-1 text-xl font-bold text-t-title">
          <span>{amount}</span>
        </div>
      );
    case 2:
      return (
        <div className="flex flex-row justify-center items-center gap-1 text-lg font-bold text-t-description">
          <span>{amount}</span>
        </div>
      );
    case 3:
      return (
        <div className="flex flex-row justify-center items-center gap-1 text-lg font-bold text-t-description">
          <span>{amount}</span>
        </div>
      );
    case 4:
      return (
        <div className="flex flex-row justify-center items-center gap-1 text-lg font-bold text-t-description">
          <span>{amount}</span>
        </div>
      );
    default:
      return <div></div>;
  }
};
export default RattingRef;
