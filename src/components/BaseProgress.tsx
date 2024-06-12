export default function BaseProgress() {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className="bg-primary h-2.5 rounded-full"
        style={{
          width: "45%",
        }}
      ></div>
    </div>
  );
}
