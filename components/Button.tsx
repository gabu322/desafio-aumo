import Link from "next/link";
import { ReactNode, MouseEventHandler } from "react";

type ButtonProps = {
   className?: string;
   type?: "button" | "submit" | "reset";
   onClick?: MouseEventHandler<HTMLButtonElement>;
   color?: keyof typeof bgColors;
   bgColor?: string;
   hoverColor?: string;
   text?: string;
   textColor?: string;
   textSize?: string;
   href?: string;
   blank?: string;
   children?: ReactNode;
   noShadow?: boolean;
   rounded?: boolean;
   disabled?: boolean;
};

const bgColors = {
   blue: { bg: "bg-blue-600", hover: "hover:bg-blue-700" },
   red: { bg: "bg-red-500", hover: "hover:bg-red-600" },
   green: { bg: "bg-green-600", hover: "hover:bg-green-700" },
   yellow: { bg: "bg-yellow-300", hover: "hover:bg-yellow-400" },
   orange: { bg: "bg-orange-400", hover: "hover:bg-orange-500" },
   black: { bg: "bg-black", hover: "hover:bg-gray-800" },
};

export default function Button({ className = "", type = "button", onClick, color = "blue", bgColor, hoverColor, text, textColor = "text-white", textSize = "text-sm", href, blank = "", children, noShadow = false, rounded = false, disabled = false }: ButtonProps) {
   const colors = bgColors[color];
   const bg_color = bgColor || colors.bg;
   const hover_color = hoverColor || colors.hover;

   return (
      <button
         type={type}
         className={`flex items-center justify-center relative h-10 px-3 ${!noShadow ? "shadow-sm hover:shadow" : ""} transition-all duration-200 cursor-pointer font-semibold ${textSize} ${textColor} ${className} ${bg_color} ${hover_color} ${rounded ? "rounded-full" : "rounded"}`}
         onClick={onClick}
         disabled={disabled}
      >
         {children || text}

         {href && (
            <Link
               href={href}
               target={blank}
               className="absolute w-full h-full"
            />
         )}
      </button>
   );
}
