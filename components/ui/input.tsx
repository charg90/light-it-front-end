"use client";

import React from "react";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string;
  required?: boolean;
  size?: "sm" | "md" | "lg";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className = "", label, error, required = false, size = "md", ...props },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-5 py-4 text-lg",
    };

    const labelSizeClasses = {
      sm: "text-xs px-2",
      md: "text-sm px-3",
      lg: "text-base px-3",
    };

    return (
      <div className="relative">
        <input
          ref={ref}
          className={`
            w-full
            ${sizeClasses[size]}
            bg-gray-800
            border-2 border-gray-300
            rounded-lg
            text-white
            placeholder-gray-400
            focus:outline-none
            focus:border-white
            transition-colors
            duration-200
            ${error ? "border-red-400 focus:border-red-400" : ""}
            ${className}
          `.trim()}
          {...props}
        />

        <label
          className={`
          absolute
          -top-3
          left-3
          ${labelSizeClasses[size]}
          bg-gray-800
          text-gray-300
          font-medium
          pointer-events-none
        `.trim()}
        >
          {label}
          {required && "*"}
        </label>

        {error && (
          <p className="mt-1 text-sm text-red-400 animate-bounce" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
