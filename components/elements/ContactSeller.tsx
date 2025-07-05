"use client";
import Link from "next/link";

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
            <h3>Contact Us</h3>
            <form onSubmit={handleSubmit}>
                <div className="input-area">
                    <input type="text" name="fullName" placeholder="Full Name" required />
                </div>
                <div className="input-area">
                    <input type="tel" name="phoneNumber" placeholder="Phone Number" required />
                </div>
                <div className="input-area">
                    <input type="email" name="email" placeholder="Email Address" required />
                </div>
                <div className="input-area">
                    <textarea name="message" placeholder="Your Message" required />
                </div>
                <div className="input-area">
                    <button type="submit" className="vl-btn1">
                        Send Message
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