import { forwardRef } from "react";

const FormInput = forwardRef(
  (
    {
      label,
      type = "text",
      icon: Icon,
      error,
      variant = "dark", // ⭐ dark | light
      ...props
    },
    ref,
  ) => {
    const isDark = variant === "dark";

    return (
      <div className="space-y-1">
        <label
          className={`text-sm font-medium mb-1 block ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {label}
        </label>

        <div
          className={`flex items-center border rounded-xl px-4 py-3 transition
          ${
            isDark
              ? "bg-gray-900/60 border-gray-700 focus-within:border-purple-500"
              : "bg-white border-gray-200 focus-within:border-purple-500"
          }
          ${error && "border-red-500 focus-within:border-red-500"}
          `}
        >
          {Icon && <Icon size={18} className="text-gray-400 mr-3" />}

          <input
            ref={ref}
            type={type}
            className={`w-full outline-none text-sm ${
              isDark
                ? "bg-transparent text-white placeholder-gray-500"
                : "bg-transparent text-gray-800 placeholder-gray-400"
            }`}
            {...props}
          />
        </div>

        {error && <p className="text-xs text-red-400 mt-1">{error.message}</p>}
      </div>
    );
  },
);

export default FormInput;
