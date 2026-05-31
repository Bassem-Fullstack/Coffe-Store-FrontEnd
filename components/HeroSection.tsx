"use client";

import Image from "next/image";

import { motion } from "motion/react";

import { useTypewriter , Cursor } from "react-simple-typewriter";

import Link from "next/link";

export default function HeroSection() {

const [text] = useTypewriter({

words: ["Discover Your Coffee", "Fresh Roasted Beans", "Handcrafted Aroma"],

loop : true , 

delaySpeed : 2000,

typeSpeed : 50 ,

deleteSpeed : 50

})


  return (
     
 <section id="home" className=" overflow-hidden relative bg-gradient-to-br from-[#FAF7F0] to-[#EADBC8] mb-5">

  <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-6 lg:px-16 py-7  gap-14">

   <motion.div className="flex flex-col items-center lg:items-start text-center lg:text-left"
    
   initial= {{opacity :0 , y:100}}

   animate={{opacity : 1 , y :0}} 
   
   transition={{duration:0.81 , delay: 0}}

   >
    
    <span className="inline-block px-4 py-1 rounded-full bg-[#C08B5C]/20 text-sm font-medium mb-5 text-[#4B2E2B] italic">Fresh Coffee 2026</span> 

     
     <h2 className="md:text-5xl text-[32px] font-bold text-[#4B2E2B] mb-1 whitespace-nowrap">
        
        {text} 
        
        <Cursor/>

     </h2>
       
 <p className=" text-[#2B2B2B]/80 text-base sm:text-lg max-w-lg">Experience the best handcrafted coffee made from premium roasted beans
  with rich aroma and unforgettable taste.</p>


 <motion.div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4"
 
  initial= {{opacity :0 , y:120}}

   animate={{opacity : 1 , y :0}} 
   
   transition={{duration:0.89 , delay: 0.2}}
 >


     <Link href="/#offers"  className="px-7 py-3 rounded-2xl bg-[#4B2E2B] text-[#FAF7F0] font-medium hover:bg-[#C08B5C] transition">Start Shopping </Link>

     <Link href="/#categories" className="px-7 py-3 rounded-2xl border border-[#4B2E2B]/20 text-[#4B2E2B] hover:bg-[#EADBC8] transition">Explore More </Link>

     </motion.div>{/* mt-8 flex flex-wrap*/}

<motion.div className="flex flex-wrap justify-center lg:justify-start gap-10 mt-12"

  initial= {{opacity :0 , y:120}}

   animate={{opacity : 1 , y :0}} 
   
   transition={{duration:0.9 , delay : 0.3}}
>

  <div>

    <h3 className="text-3xl font-bold text-[#4B2E2B]">10K+</h3>

    <p className="text-[#2B2B2B]/70">Customers</p>

  </div>  {/* text-3xl font-bold text-[#4B2E2B] */}

  <div>

    <h3 className="text-3xl font-bold text-[#4B2E2B]">500+</h3>

    <p className="text-[#2B2B2B]/70">Products</p>

  </div>  {/* text-3xl font-bold text-[#4B2E2B] */}

  <div>

    <h3 className="text-3xl font-bold text-[#4B2E2B]">4.9</h3>

    <p className="text-[#2B2B2B]/70">Rating</p>

  </div> {/* text-3xl font-bold text-[#4B2E2B] */}

</motion.div> {/*flex flex-wrap justify-center lg:justify-start gap-10  */}

</motion.div> {/*flex flex-col items-center lg:items-start */}
  

  <motion.div 

   className="relative flex justify-center lg:justify-end"

   initial={{ opacity: 0, x: 220 }}

  animate={{ opacity: 1, x: 0 }}

  transition={{ duration: 0.9 , delay : 0.39}}

  >
    

  <div className="absolute w-[250px] h-[250px] bg-[#C08B5C]/30 blur-3xl rounded-full "></div>

    
    <Image 
     
     src="/pic1.png"

     alt="coffe_image"

     width={500}

     height={500}

     priority
    
    className="relative z-10 w-[280px] sm:w-[400px] lg:w-[520px] h-auto object-contain"

    />
    
    </motion.div>  


  </div> {/*container  mx-auto */}
  

  </section> //{/* min-h-[90vh] overflow-hidden relative */}


  );
}