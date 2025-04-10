import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  error?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
}

export function Input({
  name,
  placeholder,
  type,
  error,
  register,
  rules,
}: InputProps) {
  return (
    <div>
      <input
        className="w-full border-2 rounded-md h-11 px-3"
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        id={name}
      />
      {error && <span className="text-red-600 my-1">{error}</span>}
    </div>
  );
}
