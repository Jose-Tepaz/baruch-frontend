'use client'
import Link from "next/link";
import { useTranslation } from "@/utils/i18n-simple";
interface Category {
    slug: string;
    name: string;
    description: string;
    image: string;
}

interface Category1Props {
    categories: Category[];
}

export default function Category1({ categories }: Category1Props) {
    const { t } = useTranslation('common');

    if (!categories || categories.length === 0) {
        return null;
    }

    // Definir el orden personalizado de las categorías
    // Modifica este array con los nombres exactos de tus categorías en el orden que desees
    const customOrder = [
        'Villas',
        'Apartaments', 
        'Golf Properties',
        'New Developments',
        // Agrega más categorías según necesites
    ];

    // Ordenar categorías según el orden personalizado
    const sortedCategories = [...categories].sort((a, b) => {
        const indexA = customOrder.indexOf(a.name);
        const indexB = customOrder.indexOf(b.name);
        
        // Si la categoría no está en el array personalizado, ponerla al final
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        
        return indexA - indexB;
    });

    return (
        <div className="category-section_home">
            <div className="padding-global">

                <div className="container-large">
                    <div className="category1">
                        <div className="">
                            <div className="row">
                                <div className="col-lg-7 m-auto">
                                    <div className=" text-center ">
                                       
                                        <div className="space16" />
                                        <h3 className=" text-color-black-blue ">{t('home.title-category')}</h3>
                                    </div>
                                </div>
                            </div>
                            


                        </div>
                    </div>

                </div>
            </div>
            <div className="section-wrapper-category">
                                <div className="wrapper-category">
                                    {sortedCategories.map((category: Category, index: number) => (
                                        <div className="card-category" key={category.slug || index}>
                                            <Link href={`/categories/${category.slug}`}>
                                                <div className="" >
                                                    <div className="category-boxarea">

                                                        {category.image ? (
                                                            <div className="img1">
                                                                <img src={category.image} alt={category.name} />
                                                            </div>
                                                        ) : (
                                                            <div style={{ height: '60px', backgroundColor: '#eaeaea' }} />
                                                        )}

                                                        <div className="text-absolute">
                                                            <p className="size-16">{category.name}</p>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>

                                        </div>
                                    ))}
                                </div>

                                <div className="btn-area1" style={{ margin:'auto' }}>
                                    <Link href="/properties" className="vl-btn1">
                                        {t('home.btn-1-hero')}
                                        <span className="arrow1 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                        <span className="arrow2 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                    </Link>
                                </div>
                            </div>
        </div>
    );
}