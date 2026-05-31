"use client";

import Image from "next/image";

import Link from "next/link";

import { motion } from "motion/react";

import { AllCategories } from "@/lib/api";

export default function CategoriesSection({ categories }: { categories: AllCategories[] }) {
  return (

    <section id="categories" className="py-14">
      
   <div className="container mx-auto px-6 lg:px-12">

   <motion.div
    
    className="text-center mb-12"
    
    initial={{opacity : 0 , y:100}}

    whileInView={ {opacity:1 , y:0 } }

    viewport={{ once: true , amount : 0.3}}

    transition={{ duration: 0.7 }}
   >

    <span className="inline-block px-4 py-1 rounded-full bg-[#C08B5C]/20 text-sm font-medium mb-5 text-[#4B2E2B] italic"> Our Categories</span> 

    <h2 className="md:text-4xl text-3xl font-bold text-[#4B2E2B]" >Explore Our Collection</h2>

   </motion.div>


<div className="flex flex-wrap justify-center gap-8">


{
categories.map((item , index) => (

<motion.div

key={item._id}

 initial={{ opacity: 0, scale: 0.4 }}

whileInView={{ opacity: 1, scale: 1}}

viewport={{ once: true  , amount : 0.3}}

transition={{ duration: 0.75, delay: index * 0.2 }} // هنا بقولوة كل عنصر يتأخر شواية بسيطة لحد ما عنصر قبلة يطلع

className="w-full sm:w-[45%] lg:w-[30%]"

>


<Link href={`/categories/${item._id}`} className="w-full max-w-[400px]">

<div className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer">

<Image

src={item.image.url}

alt="Categorie product"

 width={500}
 height={400}
 priority

 className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
/>

<span className="absolute top-3 left-3 bg-white/85 text-[#5a3e28] text-xs font-medium px-3 py-1 rounded-full z-10">
    {item.name}
  </span>
  
 <div className="absolute inset-0 bg-[#2B2B2B]/70 flex flex-col items-center justify-center gap-4

-translate-y-full group-hover:translate-y-0 transition-transform duration-700">
    
    <h3 className="text-[#FAF7F0] text-2xl font-bold">{item.name}</h3>
    
    <span className="px-5 py-2 bg-[#C08B5C] text-[#FAF7F0] rounded-full text-sm font-medium">
      Shop Now →
    </span>

  </div> {/* absolute inset-0 bg-[#2B2B2B]/70 flex flex-col  */}

</div> {/* relative overflow-hidden rounded-2xl */}


</Link> 


</motion.div>

))

}


</div> {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 */}


   </div> {/* container mx-auto px-6 lg:px-12 */}


    </section>  //{/* py-14 */}
  );
}