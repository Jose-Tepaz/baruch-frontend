import Layout from "@/components/layout/Layout";
import InnerHeader from "@/components/layout/InnerHeader";
import ContactSectionContact from "@/components/sections/ContactSectionContact";
import ContactHero from "@/components/sections/ContactHero";
export default function Home() {
    const imgContact = "/assets/img/all-images/contact/contact-1.webp";
    return (
        <>
            <Layout>
                <ContactHero />
                <ContactSectionContact
                    imgContact={imgContact}
                />

                <div className="space30"></div>

            </Layout>
        </>
    );
}
