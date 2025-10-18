"use client";

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from "@/utils/i18n-simple";

interface PropertyStatus {
  id: number;
  documentId: string;
  Title: string;
}

interface PropertyStatusMultiSelectProps {
  propertyStatuses: PropertyStatus[];
  selectedStatuses: string[];
  onChange: (selectedStatuses: string[]) => void;
  placeholder: string;
  name: string;
  id?: string; // optional id for the dropdown button
}

export default function PropertyStatusMultiSelect({ 
  propertyStatuses, 
  selectedStatuses, 
  onChange, 
  placeholder, 
  name, 
  id 
}: PropertyStatusMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation('common');
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleStatusToggle = (statusTitle: string) => {
    const newSelected = selectedStatuses.includes(statusTitle)
      ? selectedStatuses.filter(title => title !== statusTitle)
      : [...selectedStatuses, statusTitle];
    
    onChange(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedStatuses.length === propertyStatuses.length) {
      onChange([]);
    } else {
      onChange(propertyStatuses.map(status => status.Title));
    }
  };

  const getDisplayText = () => {
    if (selectedStatuses.length === 0) {
      return t('filters.select-option') || 'Select option';
    }
    if (selectedStatuses.length === 1) {
      return selectedStatuses[0];
    }
    if (selectedStatuses.length === propertyStatuses.length) {
      return t('home.all-statuses') || 'All Statuses';
    }
    return `${selectedStatuses.length} ${t('home.statuses-selected') || 'statuses selected'}`;
  };
  
  return (
    <div className="property-status-multi-select" ref={dropdownRef}>
      <button 
        type="button"
        id={id}
        className={`status-dropdown-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          height: '48px',
          padding: '0 16px',
          border: '1px solid #E7E7E7',
          borderRadius: '8px',
          backgroundColor: '#fff',
          fontSize: '14px',
          color: '#1B1B1B',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'left'
        }}
      >
        <span style={{ 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap',
          flex: 1
        }}>
          {getDisplayText()}
        </span>
        <i className={`fa-solid fa-chevron-down ${isOpen ? 'rotated' : ''}`} 
           style={{ 
             transition: 'transform 0.2s ease',
             transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
             marginLeft: '8px'
           }}></i>
      </button>
      
      {isOpen && (
        <div className="status-dropdown-menu"
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
               marginTop: '4px'
             }}>
          
          {/* Select All option */}
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #E7E7E7' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              <input
                type="checkbox"
                checked={selectedStatuses.length === propertyStatuses.length}
                onChange={handleSelectAll}
                className='filter-checkbox'
              />
              <span>{t('filters.select-all') || 'Select All'} </span>
            </label>
          </div>    
          
          {/* Individual status options */}
          {propertyStatuses.map((status) => (
            <div key={status.documentId} style={{ padding: '8px 12px' }}>
              <label className='filter-checkbox-label'>
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status.Title)}
                  onChange={() => handleStatusToggle(status.Title)}
                  className='filter-checkbox'
                />
                <span>{status.Title}</span>
              </label>
            </div>
          ))}
          
          {propertyStatuses.length === 0 && (    
            <div className='filter-checkbox-label'  
            >
              {t('filters.no-results') || 'No results found'}
            </div>
          )}
        </div>
      )}
      
      {/* Hidden inputs for form submission */}
      {selectedStatuses.map((statusTitle, index) => (
        <input key={index} type="hidden" name={`${name}[${index}]`} value={statusTitle} />
      ))}
    </div>
  );
}
