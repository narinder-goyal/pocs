// export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
//     return <input {...props} className="w-full border px-3 py-2 rounded" />;
// }

"use client";
import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>(
    ({ label, error, type, showPasswordToggle, className = '', ...props }, ref) => {
        const [show, setShow] = useState(false);
        const inputType = type === "password" && showPasswordToggle ? (show ? "text" : "password") : type;
        const borderClass = error ? 'border-red-500' : 'border-gray-300';


        return (
            <div>
                {label && <label htmlFor={label} className="block text-sm mb-2">{label}</label>}
                <div className="relative">
                    <input id={label} className={`w-full border p-2 rounded ${borderClass} ${className}`} type={inputType} ref={ref} {...props} />
                    {type === "password" && showPasswordToggle && (
                        <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-2">
                            {show ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    )}
                </div>
                {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>
        );
    }
);


export default Input;