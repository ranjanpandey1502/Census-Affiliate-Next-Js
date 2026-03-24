import type { ReactNode } from "react";

export default function ModalCard({heading, content, onCancel, onConfirm, confirmText="Save", cancelText="Cancel"}: {heading: string, content: ReactNode, onCancel:()=> void, onConfirm:() => void, cancelText?: string, confirmText?: string,}) {
  return (
    <div>
      <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">
        {heading}
      </h4>
      
      {content}
      <div className="flex items-center justify-end w-full gap-3 mt-8">
        <button className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 " onClick={onCancel}>
          {cancelText}
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 " onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </div>
  );
}
