"use client";

import { useEffect, useRef } from "react";

export function useDropdown() {
    const dropdownRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        const dropdown = dropdownRef.current;
        if (!dropdown) return;

        const toggle = dropdown.querySelector('.dropdown-toggle') as HTMLElement;
        const menu = dropdown.querySelector('.dropdown-menu') as HTMLElement;

        if (!toggle || !menu) return;

        const handleToggle = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = menu.classList.contains('show');
            
            // Cerrar todos los otros dropdowns
            document.querySelectorAll('.dropdown-menu.show').forEach((otherMenu) => {
                if (otherMenu !== menu) {
                    otherMenu.classList.remove('show');
                }
            });

            // Toggle del dropdown actual
            if (isOpen) {
                menu.classList.remove('show');
            } else {
                menu.classList.add('show');
            }
        };

        const handleClickOutside = (e: Event) => {
            if (!dropdown.contains(e.target as Node)) {
                menu.classList.remove('show');
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                menu.classList.remove('show');
            }
        };

        toggle.addEventListener('click', handleToggle);
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            toggle.removeEventListener('click', handleToggle);
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    return dropdownRef;
}




