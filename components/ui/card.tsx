"use client";

import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "primary" | "white" | "transparent";
  size?: "sm" | "md" | "lg";
  closable?: boolean;
  onClose?: () => void;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      children,
      style,

      ...props
    },
    ref
  ) => {
    const baseClasses = "rounded-lg transition-all duration-200 relative";

    const variantClasses = {
      primary: "text-white shadow-lg",
      white: "bg-white text-gray-900 shadow-md border border-gray-200",
      transparent:
        "bg-white/10 backdrop-blur-sm text-white border border-white/20",
    };

    const variantStyles = {
      primary: {
        backgroundColor: "#5d29fa",
      },
      white: {},
      transparent: {},
    };

    const sizeClasses = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const combinedClasses =
      `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

    const combinedStyles = {
      ...variantStyles[variant],
      ...style,
    };

    return (
      <div
        className={combinedClasses}
        style={combinedStyles}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
