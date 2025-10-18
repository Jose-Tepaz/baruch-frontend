"use client";

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from "@/utils/i18n-simple";

interface Category {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

interface CategoryMultiSelectProps {
  categories: Category[];
  selectedCategories: string[];
  onChange: (selectedCategories: string[]) => void;
  placeholder: string;
  name: string;
  id?: string;
}

export default function CategoryMultiSelect({ 
  categories, 
  selectedCategories, 
  onChange, 
  placeholder, 
  name, 
  id 
}: CategoryMultiSelectProps) {
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
  
  const handleCategoryToggle = (categorySlug: string) => {
    const newSelected = selectedCategories.includes(categorySlug)
      ? selectedCategories.filter(slug => slug !== categorySlug)
      : [...selectedCategories, categorySlug];
    
    onChange(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      onChange([]);
    } else {
      onChange(categories.map(category => category.slug));
    }
  };

  const getDisplayText = () => {
    if (selectedCategories.length === 0) {
      return t('filters.select-option') || 'Select option';
    }
    if (selectedCategories.length === 1) {
      const category = categories.find(cat => cat.slug === selectedCategories[0]);
      return category?.name || selectedCategories[0];
    }
    if (selectedCategories.length === categories.length) {
      return t('home.all-categories') || 'All Categories';
    }
    return `${selectedCategories.length} ${t('home.categories-selected') || 'categories selected'}`;
  };
  
  return (
    <div className="category-multi-select" ref={dropdownRef}>
      <button 
        type="button"
        id={id}
        className={`category-dropdown-button ${isOpen ? 'open' : ''}`}
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
        <div className="category-dropdown-menu"
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
                checked={selectedCategories.length === categories.length}
                onChange={handleSelectAll}
                className='filter-checkbox'
              />
              <span>{t('filters.select-all') || 'Select All'} </span>
            </label>
          </div>
          
          {/* Individual category options */}
          {categories.map((category) => (
            <div key={category.slug} style={{ padding: '8px 12px' }}>
              <label className='filter-checkbox-label'>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.slug)}
                  onChange={() => handleCategoryToggle(category.slug)}
                  className='filter-checkbox'
                />
                <span>{category.name}</span>
              </label>
            </div>
          ))}
          
          {categories.length === 0 && (    
            <div className='filter-checkbox-label'  
            >
              {t('filters.no-results') || 'No results found'}
              </div>
          )}
        </div>
      )}
      
      {/* Hidden inputs for form submission */}
      {selectedCategories.map((categorySlug, index) => (
        <input key={index} type="hidden" name={`${name}[${index}]`} value={categorySlug} />
      ))}
    </div>
  );
}
