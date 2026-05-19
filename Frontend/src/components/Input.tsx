import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-bold uppercase tracking-wider">{label}</label>}
      <input
        className={`border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-black transition-all ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
