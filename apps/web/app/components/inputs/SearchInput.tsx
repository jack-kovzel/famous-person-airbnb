'use client';

import React from 'react';

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
}

const SearchInput: React.FC<InputProps> = ({
  id,
  label,
  value = '',
  placeholder,
  type = 'text',
  disabled,
  onChange,
}) => {
  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        className={`
          peer
          w-[40vw]
          font-light 
          bg-white 
          border-0
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          left-4
        `}
        onChange={(event) => {
          onChange && onChange(event.target.value);
        }}
        value={value}
      />
      <label
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          left-4
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default SearchInput;
