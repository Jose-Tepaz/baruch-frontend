"use client";

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from "@/utils/i18n-simple";

interface Location {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

interface LocationMultiSelectProps {
  locations: Location[];
  selectedLocations: string[];
  onChange: (selectedLocations: string[]) => void;
  placeholder: string;
  name: string;
  id?: string;
}

export default function LocationMultiSelect({ 
  locations, 
  selectedLocations, 
  onChange, 
  placeholder, 
  name, 
  id 
}: LocationMultiSelectProps) {
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
  
  const handleLocationToggle = (locationSlug: string) => {
    const newSelected = selectedLocations.includes(locationSlug)
      ? selectedLocations.filter(slug => slug !== locationSlug)
      : [...selectedLocations, locationSlug];
    
    onChange(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedLocations.length === locations.length) {
      onChange([]);
    } else {
      onChange(locations.map(location => location.slug));
    }
  };

  const getDisplayText = () => {
    if (selectedLocations.length === 0) {
      return t('filters.select-option') || 'Select option'; 
    }
    if (selectedLocations.length === 1) {
      const location = locations.find(loc => loc.slug === selectedLocations[0]);
      return location?.name || selectedLocations[0];
    }
    if (selectedLocations.length === locations.length) {
      return t('home.all-locations') || 'All Locations';
    }
    return `${selectedLocations.length} ${t('home.locations-selected') || 'locations selected'}`;
  };
  
  return (
    <div className="location-multi-select" ref={dropdownRef}>
      <button 
        type="button"
        id={id}
        className={`location-dropdown-button ${isOpen ? 'open' : ''}`}
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
        <div className="location-dropdown-menu"
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
                checked={selectedLocations.length === locations.length}
                onChange={handleSelectAll}
                className='filter-checkbox'
              />
              <span>{t('home.select-all-locations') || 'Select All'}</span>
            </label>
          </div>
          
          {/* Individual location options */}
          {locations.map((location) => (
            <div key={location.documentId} style={{ padding: '8px 12px' }}>
              <label
              className='filter-checkbox-label'
              >
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(location.slug)}
                  onChange={() => handleLocationToggle(location.slug)}
                  className='filter-checkbox'
                  
                />
                <span>{location.name}</span>
              </label>
            </div>
          ))}
          
          {locations.length === 0 && (      
            <div className='filter-checkbox-label'  
            >
              
              {t('filters.no-results') || 'No results found'}
            </div>
          )}
        </div>
      )}
      
      {/* Hidden inputs for form submission */}
      {selectedLocations.map((locationSlug, index) => (
        <input key={index} type="hidden" name={`${name}[${index}]`} value={locationSlug} />
      ))}
    </div>
  );
}
