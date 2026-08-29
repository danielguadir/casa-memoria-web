'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Calendar, Check } from 'lucide-react';

export interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  options: DropdownOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  label,
  placeholder = 'Seleccionar opción',
  icon = <Calendar className="w-4 h-4 text-terracota" />,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left w-full sm:w-auto ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-semibold text-cafe/80 mb-1 tracking-wide">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full sm:w-auto inline-flex items-center justify-between gap-2 px-4 py-2.5 
          bg-white text-cafe border border-crema-dark rounded-xl shadow-xs 
          hover:bg-crema/50 hover:border-verde-profundo/40 transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-verde-profundo/20 text-sm font-medium
        "
      >
        <div className="flex items-center gap-2 truncate">
          {icon}
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-cafe/60 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div 
          className="
            absolute right-0 sm:left-0 mt-2 w-full sm:w-56 bg-white rounded-xl shadow-xl 
            border border-crema-dark py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 
            max-h-60 overflow-y-auto
          "
        >
          {options.map((option) => {
            const isSelected = option.value === selectedValue;
            return (
              <button
                key={option.value}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-2.5 text-sm flex items-center justify-between 
                  transition-colors hover:bg-crema-dark/50 hover:text-verde-profundo
                  ${isSelected ? 'bg-verde-profundo/10 text-verde-profundo font-bold' : 'text-cafe'}
                `}
              >
                <div className="flex items-center gap-2 truncate">
                  {option.icon}
                  <span className="truncate">{option.label}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-verde-profundo shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
