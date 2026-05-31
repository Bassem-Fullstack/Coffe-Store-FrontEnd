

import HeroSection from "@/components/HeroSection";

import About from "@/components/About US";

import { getCategories, getLimtiedProducts } from "@/lib/api";

import CategoriesSection from "@/components/Categories";

import ProductCard from "@/components/ProductsCard";

import SectionTitle from "@/components/SectionTitle";

import ReviewsSection from "@/components/Review";



export default async function Home() {

const EveryCategories = await getCategories ()


const GetAllLimtedProducts = await getLimtiedProducts()

  return (

    <main className="pt-16">
     

   <HeroSection/>
           
      <About/>
 
     <CategoriesSection categories={EveryCategories} />

<section id="offers" className="scroll-mt-20">

  <SectionTitle/>

</section>


    

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl container mx-auto px-4">

    {GetAllLimtedProducts.flatMap((item) =>

      item.products.map((ele) => (

        <ProductCard key={ele._id} product={ele} />

      ))
    )}

  </div>

  <ReviewsSection/>




    </main>
  )

  
}
