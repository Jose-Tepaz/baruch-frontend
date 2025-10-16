"use client";

import { useState } from "react";
import LegalSidebar from "./legal/LegalSidebar";
import LegalContent from "./legal/LegalContent";

export default function PrivacyPolicy() {
    const [activeTab, setActiveTab] = useState('terms');
    
    return (
        <>
            {/*===== WORKS AREA STARTS =======*/}
            <div className="privacy-policy-area">
                <div className="container">
                    <div className="row py-5">
                        <div className="col-lg-4">
                            <LegalSidebar 
                                activeTab={activeTab} 
                                onTabChange={setActiveTab} 
                            />
                        </div>
                        <div className="col-lg-8">
                            <LegalContent policyType={activeTab as 'terms' | 'privacy' | 'cookies'} />
                        </div>
                    </div>
                </div>
            </div>
            {/*===== WORKS AREA ENDS =======*/}
        </>
    );
}
