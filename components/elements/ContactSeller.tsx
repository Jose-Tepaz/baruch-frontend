"use client";
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";   

interface ContactSellerProps {
    agentName?: string;
    agentImage?: string;
    agentEmail?: string;
    agentPhone?: string;
}

export default function ContactSeller({
    agentName = "Shagor Ahmed",
    agentImage = "/assets/img/all-images/others/others-img7.png",
    agentEmail = "housa@.com",
    agentPhone = "(234) 345-4574",
}: ContactSellerProps) {
    const { t, i18n } = useTranslation('common');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            fullName: formData.get('fullName') as string,
            phoneNumber: formData.get('phoneNumber') as string,
            email: formData.get('email') as string,
            message: formData.get('message') as string,
        };

        try {
            e.currentTarget.reset();
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="details-siderbar2">
            <h3>{t("propertyDetails.contact-text")}</h3>
            <form onSubmit={handleSubmit}>
                <div className="input-area">
                    <input type="text" name="fullName" placeholder={t("propertyDetails.fullName-text")} required />
                </div>
                <div className="input-area">
                    <input type="tel" name="phoneNumber" placeholder={t("propertyDetails.phoneNumber-text")} required />
                </div>
                <div className="input-area">
                    <input type="email" name="email" placeholder={t("propertyDetails.email-text")} required />
                </div>
                <div className="input-area">
                    <textarea name="message" placeholder={t("propertyDetails.message-text")} required />
                </div>
                <div className="input-area">
                    <button type="submit" className="vl-btn1">
                        {t("propertyDetails.send-btn")}
                        <span className="arrow1 ms-2">
                            <i className="fa-solid fa-arrow-right" />
                        </span>
                        <span className="arrow2 ms-2">
                            <i className="fa-solid fa-arrow-right" />
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
} 