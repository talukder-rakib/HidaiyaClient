"use client";

import React from "react";
import { useFormContext, type FieldError } from "react-hook-form";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

interface AppFormTextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
}

const AppFormTextarea = ({
  name,
  label,
  placeholder,
  required = false,
  helperText,
  disabled = false,
  readOnly = false,
  rows = 4,
  size = "md",
  icon,
  className = "",
}: AppFormTextareaProps) => {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;
  const isDirty = dirtyFields[name];
  const isValid = isDirty && !error;

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3",
    lg: "px-5 py-4 text-lg",
  };

  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`block mb-1.5 font-medium text-white ${labelSizeClasses[size]}`}
        >
          <span>{label}</span>
          {required && <span className="text-blue-600">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3 text-gray-500">{icon}</div>
        )}

        <textarea
          id={name}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          {...register(name, {
            required: required ? `${label || name} is required` : false,
          })}
          className={`w-full rounded-lg border bg-white text-gray-800 focus:ring-2 focus:outline-none resize-none
            ${icon ? "pl-10" : ""}
            ${sizeClasses[size]}
            ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}
            ${readOnly ? "bg-gray-50 cursor-default" : ""}
            ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : isValid
                  ? "border-green-300 focus:border-green-500 focus:ring-green-100"
                  : "border-gray-300 focus:border-blue-300 focus:ring-blue-100"
            }`}
        />

        {error && (
          <div className="absolute right-3 top-3 text-red-500">
            <AlertCircle size={18} />
          </div>
        )}
        {isValid && (
          <div className="absolute right-3 top-3 text-green-500">
            <CheckCircle2 size={18} />
          </div>
        )}
      </div>

      <div className="mt-1.5 min-h-[20px]">
        {error ? (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={14} />
            {error.message}
          </p>
        ) : helperText ? (
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Info size={14} />
            {helperText}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default AppFormTextarea;
