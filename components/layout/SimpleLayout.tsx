"use client";

import { useState, useEffect } from 'react';
import HeaderSelector from "./HeaderSelector";
import FooterSelector from "./FooterSelector";
import BackToTop from "../elements/BackToTop";
import MobileMenu from "./MobileMenu";

interface SimpleLayoutProps {
    headerStyle?: Number;
    footerStyle?: Number;
    children?: React.ReactNode;
}

export default function SimpleLayout({ headerStyle, footerStyle, children }: SimpleLayoutProps) {
    const [scroll, setScroll] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isMobileMenu, setIsMobileMenu] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        // Solo agregar el listener después de que el componente esté montado
        window.addEventListener('scroll', handleScroll);
        
        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleMobileMenu = () => setIsMobileMenu((prev) => !prev);

    return (
        <>
            <div id="top" />
            
            <HeaderSelector 
                headerStyle={headerStyle} 
                scroll={mounted ? scroll : false} 
                isMobileMenu={isMobileMenu}
                handleMobileMenu={handleMobileMenu}
            />
            {isMobileMenu && (
                <MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
            )}
            
            {children}
            
            <FooterSelector footerStyle={footerStyle} />
            <BackToTop target="#top" />
        </>
    );
} 