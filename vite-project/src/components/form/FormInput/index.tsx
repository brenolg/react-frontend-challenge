import { Input } from "@/components/ui/input";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type FormInputControlledProps = Readonly<{
  name: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  rightElement?: React.ReactNode;
}>;

export function FormInput({
  name,
  placeholder,
  type = "text",
  disabled,
  rightElement,
}: FormInputControlledProps) {
  const { control } = useFormContext();

  return (
    <div className="relative">
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => {
          const error = fieldState.error?.message;

          return (
            <div className="relative">
              <Input
                {...field}
                type={type}
                value={field.value ?? ""}
                disabled={disabled}
                placeholder={placeholder}
                className={error ? "border-red-500" : ""}
              />

              {rightElement && (
                <div className="absolute inset-y-0 right-3 flex items-center">
                  {rightElement}
                </div>
              )}

              {error && (
                <p className="absolute left-0 top-full mt-1 text-sm text-red-500">
                  {error}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
