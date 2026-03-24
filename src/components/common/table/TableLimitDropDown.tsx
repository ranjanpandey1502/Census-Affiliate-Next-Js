
interface TableLimitDropDownProps {
  total: number;
  value: number;
  count: number;
  onChange: (size: number) => void;
  options?: number[];
}

export default function TableLimitDropDown({
  total,
  value,
  onChange,
  count,
  options = [10, 25, 50, 100],
}: TableLimitDropDownProps) {
  return (
    <div className="flex items-center gap-2">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border border-gray-200 dark:border-white/[0.08] rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        Showing {count}
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        of <span className="font-medium text-gray-700 dark:text-gray-300">{total}</span> items
      </span>
    </div>
  );
}