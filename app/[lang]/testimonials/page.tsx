import dynamic from 'next/dynamic';
import { getTestimonials } from '@/services/testimonials';
import { Metadata } from 'next';
import TestimonialList from '@/components/sections/TestimonialList';

// Mantener header/footer existentes como en la home
const Layout = dynamic(() => import('@/components/layout/Layout'), { ssr: true });

type Testimonial = {
  testimonial_content: string;
  name_of_client: string;
  position_of_client: string;
};

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const path = 'testimonials';
  const canonicalPath = lang === 'en' ? `/${path}/` : `/${lang}/${path}/`;
  const ogUrl = `https://www.baruchrealestate.com${canonicalPath}`;

  return {
    title: 'Client Testimonials - Baruch Real Estate',
    description: 'Read what our clients say about their experience with Baruch Real Estate. Discover why they trust us with their property needs.',
    keywords: 'testimonials, client reviews, real estate reviews, Baruch, customer feedback',
    openGraph: {
      title: 'Client Testimonials - Baruch Real Estate',
      description: 'Read what our clients say about their experience with Baruch Real Estate.',
      type: 'website',
      locale: lang === 'en' ? 'en_US' : `${lang}_${lang.toUpperCase()}`,
      url: ogUrl,
      siteName: 'Baruch Real Estate',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Client Testimonials - Baruch Real Estate',
      description: 'Read what our clients say about their experience with Baruch Real Estate.',
    },
    alternates: {
      canonical: ogUrl,
      languages: {
        en: `/${path}/`,
        es: `/es/${path}/`,
        fr: `/fr/${path}/`,
        de: `/de/${path}/`,
        pl: `/pl/${path}/`,
        sv: `/sv/${path}/`,
        nl: `/nl/${path}/`,
        'x-default': `/${path}/`,
      },
    },
  };
}

export default async function TestimonialsPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const { page } = await searchParams;
  
  let testimonials: Testimonial[] = [];
  try {
    // Forzar testimoniales en inglés, independientemente del idioma seleccionado
    testimonials = await getTestimonials('en');
  } catch (error) {
    console.error('Error loading testimonials:', error);
  }
  
  return (
    <Layout>
        <TestimonialList 
          testimonials={testimonials} 
          searchParams={{ page }}
          lang={lang}
        />
    </Layout>
  );
}

// Igual que en Testimonial2: parsear bloques JSON o mostrar texto plano
function renderBlocks(content: string) {
  try {
    const blocks = typeof content === 'string' ? JSON.parse(content) : content;
    if (Array.isArray(blocks)) {
      return blocks.map((block: any, index: number) => {
        if (block.type === 'paragraph') {
          return (
            <p key={index} className="testimonial-text">
              {(block.children || []).map((child: any) => child.text || '').join('')}
            </p>
          );
        }
        return null;
      });
    }
    return <p className="testimonial-text">{content}</p>;
  } catch {
    return <p className="testimonial-text">{content}</p>;
  }
}


