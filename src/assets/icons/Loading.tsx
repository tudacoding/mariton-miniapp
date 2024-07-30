import { twJoin } from "tailwind-merge";

export default function Loading({ className, ...props }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 256 256"
      enableBackground="new 0 0 256 256"
      xmlSpace="preserve"
      width="36px"
      height="36px"
      className={twJoin("animate-spin", className)}
      {...props}
    >
      <g>
        <g>
          <g>
            <path
              fill="currentColor"
              d="M113.1,10.5c-39.1,4.9-73,28.8-90.5,64c-13.1,26.3-16.1,54.7-8.8,83.3c2.1,8.2,4.2,13.7,8.5,22.6c6.1,12.4,13.5,22.5,23.6,32.3c21.2,20.6,48.5,32.3,78.2,33.3c19.7,0.7,38.4-3.4,56-12.1c30-15,52.4-41.7,61.6-74c1.8-6.1,3.6-16.4,4.2-22.4c0.3-4.3-0.4-6.2-3-7.9c-1.5-1-2-1.1-10.8-1.1c-8.4,0-9.4,0.1-11.3,1c-2.9,1.4-4.1,3.8-4.7,9c-4.8,39-34.4,70.2-72.9,76.9c-39.2,6.8-78.5-13.7-95.4-49.9C29.4,125.9,42.7,78,78.8,54c11.4-7.5,24-12.3,37.4-13.9c6.8-0.9,7.1-1,9-2.4c2.5-1.9,2.8-3.2,2.8-13.3c0-10.1-0.3-11.3-2.9-13.2C123.3,9.8,119.9,9.7,113.1,10.5z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
