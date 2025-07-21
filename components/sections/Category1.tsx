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
    return (
        <>
            <div className="space60"></div>
            <div className="category-section_home">
                <div className="global-padding">
                <div className="space60"></div>
                    <div className="container-large">
                    <div className="category1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 m-auto">
                            <div className="heading1 text-center space-margin60">
                                <h5>{t('home.subtitle-category')}</h5>
                                <div className="space16" />
                                <h3 className="text-anime-style-3 text-white ">{t('home.title-category')}</h3>
                            </div>
                        </div>
                    </div>
<div className="row">
    <div className="row gap-1 justify-content-center">
    {categories.map((category: Category, index: number) => (
                        <div className="col-lg-3" key={category.slug || index}>
                            <Link href={`/categories/${category.slug}`}>
                            <div className="row" >
                                <div className="category-boxarea">

                                    {category.image ? (
                                        <div className="img1">
                                            <img src={category.image} alt={category.name} />
                                        </div>
                                    ) : (
                                        <div style={{ height: '60px', backgroundColor: '#eaeaea' }} />
                                    )}

                                    <div className="text ">
                                        <h5 className="text-white">{category.name}</h5>
                                        <div className="space16" />
                                        <p className="text-white">{category.description}</p>
                                    </div>
                                </div>
                            </div>
                            </Link>
                            
                        </div>
                    ))}
    </div>
</div>
                    

                </div>
            </div>
            <div className="space60"></div>
                    </div>
                </div>

            </div>
            
        </>
    );
}