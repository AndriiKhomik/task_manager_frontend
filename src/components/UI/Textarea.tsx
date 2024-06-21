import React, { FC } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import cn from "../../utils";

interface InputProps {
  label?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  classNames?: string;
  placeholder?: string;
}

const Textarea: FC<InputProps> = ({
  id,
  register,
  disabled,
  label,
  required,
  classNames,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900 text-left"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={id}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder={placeholder}
          className={cn(
            "bg-slate-200 border border-slate-400 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-slate-400 focus:outline-none block w-full p-2",
            classNames
          )}
        />
      </div>
    </div>
  );
};

export default Textarea;
