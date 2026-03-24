"use client";

import { useState, useRef, useEffect } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SingleSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  name: string;
  id?: string;
}

export default function SingleSelect({
  options,
  value,
  onChange,
  placeholder,
  name,
  id,
}: SingleSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue === value ? '' : optionValue);
    setIsOpen(false);
  };

  return (
    <div className="single-select" ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        id={id}
        className={`single-select-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          height: '48px',
          padding: '0 16px',
          border: '1px solid #E7E7E7',
          borderRadius: '8px',
          backgroundColor: '#fff',
          fontSize: '14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'left',
        }}
      >
        <span style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
          color: !value ? '#888' : '#1B1B1B',
        }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <i
          className="fa-solid fa-chevron-down"
          style={{
            transition: 'transform 0.2s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            marginLeft: '8px',
            color: '#1B1B1B',
          }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            border: '1px solid #E7E7E7',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            maxHeight: '300px',
            overflowY: 'auto',
            marginTop: '4px',
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              style={{
                padding: '10px 16px',
                fontSize: '14px',
                cursor: 'pointer',
                color: '#1B1B1B',
                backgroundColor: value === option.value ? '#F5F5F5' : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F5F5')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = value === option.value ? '#F5F5F5' : '#fff')}
            >
              <span>{option.label}</span>
              {value === option.value && (
                <i className="fa-solid fa-check" style={{ fontSize: '12px', color: 'var(--ztc-bg-bg-3)' }} />
              )}
            </div>
          ))}
        </div>
      )}

      <input type="hidden" name={name} value={value} />
    </div>
  );
}
