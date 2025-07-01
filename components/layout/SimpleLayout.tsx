"use client";

import { useState, useEffect } from 'react';
import HeaderSelector from "./HeaderSelector";
import FooterSelector from "./FooterSelector";
import BackToTop from "../elements/BackToTop";

interface SimpleLayoutProps {
    headerStyle?: Number;
    footerStyle?: Number;
    children?: React.ReactNode;
}

export default function SimpleLayout({ headerStyle, footerStyle, children }: SimpleLayoutProps) {
    const [scroll, setScroll] = useState(false);
    const [mounted, setMounted] = useState(false);

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

    return (
        <>
            <div id="top" />
            
            <HeaderSelector 
                headerStyle={headerStyle} 
                scroll={mounted ? scroll : false} 
            />
            
            {children}
            
            <FooterSelector footerStyle={footerStyle} />
            <BackToTop target="#top" />
        </>
    );
} 