"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function About() {
  return (

  <section id="about" className="py-20 overflow-hidden ">
    
   <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
    
   <motion.div 

    initial={{ opacity: 0, x: 100 }}

  whileInView={{ opacity: 1, x: 0 }}

  viewport={{ once: true, amount: 0.2 }}

  transition={{ duration: 0.9, delay: 0.1 }}
    
   className="order-2 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left  "
   >

   <span className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-5 text-[#4B2E2B] bg-[#C08B5C]/20 italic">Our Story</span>
    

   <h2 className="text-4xl md:text-5xl font-bold text-[#4B2E2B] mb-5 leading-tight ">More Than Just a <br /> Cup of Coffee</h2>

   <p className="text-[#2B2B2B]/80 text-base sm:text-lg max-w-lg mb-4 ">

 At Coffee Store, we believe every cup tells a story. Since our beginning,

 we have been passionate about sourcing the finest beans from the world is

most renowned coffee farms.Every batch is freshly roasted by our experts to bring out the richest 
aromas and boldest flavors — crafted for those who truly appreciate 
the art of coffee.
              
   </p>



  <motion.div 

  className="flex flex-wrap justify-center lg:justify-start gap-8 mb-5"
  
    initial={{ opacity: 0, y: 40 }}

    whileInView={{opacity : 1 , y:0}}

    viewport={{ once: true, amount: 0.3 }}

    transition={{ duration: 0.8, delay: 0.3 }}
  >


 <div>
  
<h3 className="text-3xl font-bold text-[#4B2E2B]">10+</h3>

<p className="text-[#2B2B2B]/70">Years of Experience</p>

  </div> {/* </div>1  */}


 <div>
  
<h3 className="text-3xl font-bold text-[#4B2E2B]">20+</h3>

<p className="text-[#2B2B2B]/70">Coffee Origins</p>

  </div> {/* </div>2  */}


 <div>
  
<h3 className="text-3xl font-bold text-[#4B2E2B]">100%</h3>

<p className="text-[#2B2B2B]/70">Natural Beans</p>

  </div> {/* </div> 3  */}


  </motion.div> { /* flex flex-wrap justify-center lg:justify-start*/ }
    

   </motion.div> { /* order-1 lg:order-2 */ }

    

<motion.div  

className="order-1 lg:order-1 flex justify-center lg:justify-start"

 initial={{ opacity: 0, x: -100 }}

 whileInView={{ opacity: 1, x: 0 }}

 viewport={{ once: true, amount: 0.2 }}

transition={{ duration: 0.9, delay: 0.1 }}

>

<Image

alt="Our Store" 

width={500}

height={500}

 priority 

 src="/pic6.jpg"

 className="w-[280px] md:w-[400px] lg:w-[370px] h-auto object-cover rounded-2xl shadow-xl"

/>


</motion.div>


  </div>  { /* container mx-auto px-6 lg:px-16 grid   */ }
   

  </section> //{ /* py-10 overflow-hidden  */ }

  );
}





