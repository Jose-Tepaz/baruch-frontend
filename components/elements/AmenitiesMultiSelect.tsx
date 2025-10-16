"use client";

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from "@/utils/i18n-simple";

interface Amenity {
  id: number;
  documentId: string;
  Name: string;
  slug: string;
}

interface AmenitiesMultiSelectProps {
  amenities: Amenity[];
  selectedAmenities: string[];
  onChange: (selectedAmenities: string[]) => void;
  placeholder: string;
  name: string;
  id?: string;
}

export default function AmenitiesMultiSelect({ 
  amenities, 
  selectedAmenities, 
  onChange, 
  placeholder, 
  name, 
  id 
}: AmenitiesMultiSelectProps) {
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
  
  const handleAmenityToggle = (amenityName: string) => {
    const newSelected = selectedAmenities.includes(amenityName)
      ? selectedAmenities.filter(name => name !== amenityName)
      : [...selectedAmenities, amenityName];
    
    onChange(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedAmenities.length === amenities.length) {
      onChange([]);
    } else {
      onChange(amenities.map(amenity => amenity.Name));
    }
  };

  const getDisplayText = () => {
    if (selectedAmenities.length === 0) {
      return t('filters.select-option') || 'Select option';
    }
    if (selectedAmenities.length === 1) {
      return selectedAmenities[0];
    }
    if (selectedAmenities.length === amenities.length) {
      return t('home.all-amenities') || 'All Amenities';
    }
    return `${selectedAmenities.length} ${t('home.amenities-selected') || 'amenities selected'}`;
  };
  
  return (
    <div className="amenities-multi-select" ref={dropdownRef}>
      <button 
        type="button"
        id={id}
        className={`amenities-dropdown-button ${isOpen ? 'open' : ''}`}
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
        <div className="amenities-dropdown-menu"
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
                checked={selectedAmenities.length === amenities.length}
                onChange={handleSelectAll}
                className='filter-checkbox'
              />
              <span>{t('filters.select-all') || 'Select All'} </span>
            </label>
          </div>
          
          {/* Individual amenity options */}
          {amenities.map((amenity) => (
            <div key={amenity.documentId} style={{ padding: '8px 12px' }}>
              <label className='filter-checkbox-label'>
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity.Name)}
                  onChange={() => handleAmenityToggle(amenity.Name)}
                  className='filter-checkbox'
                />
                <span>{amenity.Name}</span>
              </label>
            </div>
          ))}
          
          {amenities.length === 0 && (    
            <div className='filter-checkbox-label'  
            >
              {t('home.no-amenities-available') || 'No amenities available'}
            </div>
          )}
        </div>
      )}
      
      {/* Hidden inputs for form submission */}
      {selectedAmenities.map((amenityName, index) => (
        <input key={index} type="hidden" name={`${name}[${index}]`} value={amenityName} />
      ))}
    </div>
  );
}
