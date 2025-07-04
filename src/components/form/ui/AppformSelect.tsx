"use client";

import type React from "react";
import { useFormContext, type FieldError } from "react-hook-form";
import { AlertCircle, CheckCircle2, Info, ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface AppFormSelectProps {
  name: string;
  options: Option[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
  linkedField?: string;
  valueMap?: Record<string, string>;
}

const AppFormSelect = ({
  name,
  options,
  label,
  placeholder = "Select an option",
  required = false,
  helperText,
  disabled = false,
  size = "md",
  icon,
  className = "",
  linkedField,
  valueMap,
}: AppFormSelectProps) => {
  const {
    register,
    formState: { errors, dirtyFields },
    setValue,
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;
  const isDirty = dirtyFields[name];
  const isValid = isDirty && !error;

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5",
    lg: "px-5 py-3 text-lg",
  };

  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  // Handle change to update linked field if provided
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    // If we have a linked field and a value map, update the linked field
    if (linkedField && valueMap) {
      // If no value is selected (placeholder), clear the linked field
      if (!selectedValue) {
        setValue(linkedField, "", {
          shouldValidate: true,
          shouldDirty: true,
        });
      } else if (valueMap[selectedValue]) {
        setValue(linkedField, valueMap[selectedValue], {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  };

  return (
    <div className={`mb-5 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`block mb-1.5 font-medium text-white ${labelSizeClasses[size]}`}
        >
          {label} {required && <span className="text-blue-600">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}

        <select
          id={name}
          disabled={disabled}
          {...register(name, {
            required: required ? `${label || name} is required` : false,
            onChange: handleChange,
          })}
          className={`w-full rounded-lg border transition-all duration-200 bg-black focus:ring-2 focus:outline-none appearance-none
            ${icon ? "pl-10" : ""}
            pr-10
            ${sizeClasses[size]}
            ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}
            ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : isValid
                  ? "border-green-300 focus:border-green-500 focus:ring-green-100"
                  : "border-gray-300 focus:border-blue-300 focus:ring-blue-100"
            }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          <ChevronDown size={18} />
        </div>

        {error && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-red-500">
            <AlertCircle size={18} />
          </div>
        )}
        {isValid && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-green-500">
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

export default AppFormSelect;
