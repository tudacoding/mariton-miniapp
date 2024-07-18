const Plus = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 21C5.48869 21 1 16.5113 1 11C1 5.48869 5.48869 1 11 1C16.5113 1 21 5.48869 21 11C21 16.5113 16.5113 21 11 21Z"
        fill="#7FC624"
        stroke="#664429"
        stroke-width="1.5"
      />
      <path
        d="M11 6V16"
        stroke="white"
        stroke-width="2.5"
        stroke-linecap="round"
      />
      <path
        d="M16 11L6 11"
        stroke="white"
        stroke-width="2.5"
        stroke-linecap="round"
      />
    </svg>
  );
};
export default Plus;
