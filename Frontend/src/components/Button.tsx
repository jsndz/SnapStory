import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'solid', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'px-6 py-2 font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyles = variant === 'solid' 
    ? 'bg-black text-white border-2 border-black hover:bg-white hover:text-black' 
    : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${widthStyles} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
