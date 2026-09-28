import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  View,
} from "react-native";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends PressableProps {
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  textClassName?: string;
}

export const Button = ({
  title,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  iconPosition = "left",
  className = "",
  textClassName = "",
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-primary border-transparent active:opacity-90",
    secondary: "bg-secondary border-transparent active:opacity-90",
    tertiary: "bg-tertiary border-transparent active:opacity-90",
    outline:
      "bg-transparent border border-neutral-300 dark:border-neutral-700 active:bg-neutral-100 dark:active:bg-neutral-800",
    ghost:
      "bg-transparent border-transparent active:bg-neutral-100 dark:active:bg-neutral-800",
    danger: "bg-red-600 border-transparent active:bg-red-700",
  };

  // Estilos del texto según variante
  const textVariantStyles: Record<ButtonVariant, string> = {
    primary: "text-white font-semibold",
    secondary: "text-white font-semibold",
    tertiary: "text-white font-semibold",
    outline: "text-neutral-800 dark:text-neutral-200 font-medium",
    ghost: "text-neutral-700 dark:text-neutral-300 font-medium",
    danger: "text-white font-semibold",
  };

  // Dimensiones del contenedor según tamaño
  const sizeStyles: Record<ButtonSize, string> = {
    sm: "h-9 px-3 rounded-lg gap-1.5",
    md: "h-11 px-4 rounded-xl gap-2",
    lg: "h-14 px-6 rounded-2xl gap-3",
  };

  // Tamaño tipográfico según tamaño
  const textSizeStyles: Record<ButtonSize, string> = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <Pressable
      disabled={isDisabled}
      className={`flex-row items-center justify-center border ${sizeStyles[size]} ${variantStyles[variant]} ${
        isDisabled ? "opacity-50" : ""
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "outline" || variant === "ghost" ? "#64748b" : "#ffffff"
          }
        />
      ) : (
        <>
          {icon && iconPosition === "left" ? <View>{icon}</View> : null}

          {title ? (
            <Text
              className={`${textSizeStyles[size]} ${textVariantStyles[variant]} ${textClassName}`}
            >
              {title}
            </Text>
          ) : null}

          {children}

          {icon && iconPosition === "right" ? <View>{icon}</View> : null}
        </>
      )}
    </Pressable>
  );
};

export default Button;
