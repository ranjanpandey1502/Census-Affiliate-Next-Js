import { useState, useRef, useEffect, type ReactNode } from "react";

type Position = "top" | "bottom" | "left" | "right";
type Variant = "default" | "info" | "success" | "danger" | "warning";

interface TooltipProps {
  content: ReactNode;
  position?: Position;
  variant?: Variant;
  delay?: number;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900",
  info: "bg-blue-700 text-white",
  success: "bg-green-800 text-white",
  danger: "bg-red-700 text-white",
  warning: "bg-amber-700 text-white",
};

const positionStyles: Record<Position, string> = {
  top: "bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 origin-bottom",
  bottom: "top-[calc(100%+8px)] left-1/2 -translate-x-1/2 origin-top",
  left: "right-[calc(100%+8px)] top-1/2 -translate-y-1/2 origin-right",
  right: "left-[calc(100%+8px)] top-1/2 -translate-y-1/2 origin-left",
};

const arrowStyles: Record<Position, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-[5px] border-x-[5px] border-x-transparent",
  bottom:
    "bottom-full left-1/2 -translate-x-1/2 border-b-[5px] border-x-[5px] border-x-transparent",
  left: "left-full top-1/2 -translate-y-1/2 border-l-[5px] border-y-[5px] border-y-transparent",
  right:
    "right-full top-1/2 -translate-y-1/2 border-r-[5px] border-y-[5px] border-y-transparent",
};

const arrowColorStyles: Record<Variant, string> = {
  default: "border-gray-900 dark:border-gray-100",
  info: "border-blue-700",
  success: "border-green-800",
  danger: "border-red-700",
  warning: "border-amber-700",
};

export function Tooltip({
  content,
  position = "top",
  variant = "default",
  delay = 0,
  children,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    if (!timerRef.current) return;
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  useEffect(
    () => () => {
      if (timerRef.current) return clearTimeout(timerRef.current);
      else return;
    },
    [],
  );

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      <div
        role="tooltip"
        className={`
          pointer-events-none absolute z-50 whitespace-nowrap
          rounded-md px-2.5 py-1.5 text-[13px] leading-snug
          transition-all duration-150
          ${positionStyles[position]}
          ${variantStyles[variant]}
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        {content}
        <span
          className={`absolute border-transparent ${arrowStyles[position]} ${arrowColorStyles[variant]}`}
        />
      </div>
    </div>
  );
}
