import { NoDataTableIcon } from "@/assets/icons";

export default function TableNoContent() {
  return (
    <tbody>
      <tr>
        <td colSpan={999} className="py-10 lg:py-20 text-center">
          <div className="text-blue-500 flex items-center justify-center lg:h-60 h-50">
            <div className="flex flex-col items-center justify-center text-brand-600">
              <div className="dark:text-gray-400 text-5xl">
                <NoDataTableIcon />
              </div>
              <span className="dark:text-gray-400">No records found</span>
              <span className="text-theme-sm dark:text-gray-400">
                There's nothing here yet. Add your first record to get started.
              </span>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  );
}
