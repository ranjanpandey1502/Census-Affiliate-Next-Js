export type StatisticsTabProps = {
  selectedOption: string;
  options: Array<string>;
  onChange: (selectedOption: string) => void;
};

export default function StatisticsTab({
  onChange,
  selectedOption,
  options,
}: StatisticsTabProps) {
  const getButtonClass = (option: string) =>
    selectedOption === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      {options.map((option) => {
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white text-nowrap ${getButtonClass(
              option,
            )}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
