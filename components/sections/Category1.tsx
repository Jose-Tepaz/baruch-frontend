import { getCategories } from "@/services/categories";
import Link from "next/link";



export const Category1 = async () => {
    const categories = await getCategories();
    console.log(categories);
    if (categories.length === 0) return null;
   
    return (
        <>
            <div className="space30"></div>
            <div className="category1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 m-auto">
                            <div className="heading1 text-center space-margin60">
                                <h5>Category</h5>
                                <div className="space16" />
                                <h2 className="text-anime-style-3">Select The Home That Suits You</h2>
                            </div>
                        </div>
                    </div>
<div className="row">
    <div className="row gap-1 justify-content-center">
    {categories.map((category: any, index: number) => (
                        <div className="col-lg-3" key={index}>
                            <Link href={`/categories/${category.slug}`}>
                            <div className="row" data-aos="zoom-in-up" data-aos-duration={800}>
                                <div className="category-boxarea">

                                    {category.image ? (
                                        <div className="img1">
                                            <img src={category.image} alt={category.name} />
                                        </div>
                                    ) : (
                                        <div style={{ height: '60px', backgroundColor: '#eaeaea' }} />
                                    )}

                                    <div className="text">
                                        <Link href={`/categories/${category.slug}`}>{category.name}</Link>
                                        <div className="space16" />
                                        <p>{category.description}</p>
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
        </>
    );
}



export default Category1;