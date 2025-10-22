
import dynamic from 'next/dynamic';
import { getTestimonials } from '@/services/testimonials';


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

export default async function TestimonialsPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const { page } = await searchParams;
  const testimonials: Testimonial[] = await getTestimonials(lang);
  
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


