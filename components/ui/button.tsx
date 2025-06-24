import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      primary:
        "text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200",
      secondary:
        "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200",
    };

    const variantStyles = {
      primary: {
        backgroundColor: "#7345fc",
        backgroundImage: "linear-gradient(135deg, #7345fc 0%, #5c37d4 100%)",
      },
      secondary: {},
    };

    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const combinedClasses =
      `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

    return (
      <button
        className={combinedClasses}
        style={
          variant === "primary"
            ? variantStyles.primary
            : variantStyles.secondary
        }
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
