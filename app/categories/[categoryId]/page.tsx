import CategoryDetailPage from '../../[lang]/categories/[categoryId]/page';

interface Props {
  params: Promise<{
    categoryId: string;
  }>;
}

// Wrapper que pasa lang='en' junto con el parámetro categoryId
export default async function RootCategoryDetailPage({ params }: Props) {
  const { categoryId } = await params;
  
  return CategoryDetailPage({ 
    params: Promise.resolve({ 
      lang: 'en',
      categoryId: categoryId
    }) 
  });
}

// No hay generateMetadata ni generateStaticParams en el archivo original
