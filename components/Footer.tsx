

"use client"

import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"

import { motion } from "motion/react";


export default function Footer () {


return (

<section className=" py-10 bg-gradient-to-r from-[#2B2B2B] to-[#C08B5C]">

<motion.div className="container mx-auto px-6 lg:px-12"

 initial={{opacity : 0 , y:100}}

  whileInView={ {opacity:1 , y:0 } }

   viewport={{ once: true }}

    transition={{ duration: 0.7 }}

>


<div className="flex flex-col items-center mb-4">

<span className="text-[#FAF7F0] text-lg"> Coffe Store. </span>


<h2 className="text-[#FAF7F0] text-lg"> ©  All Rights Reserved 2026 </h2>


</div> {/* flex flex-col items-center  */}


<div className="flex justify-center items-center gap-3 cursor-pointer">

<p className="text-3xl bg-blue-500 text-[#FAF7F0] rounded-2xl"> <FaFacebook/></p>

<p className="text-3xl bg-pink-600 text-[#FAF7F0] rounded-2xl"> <FaInstagram/></p>

<p className="text-3xl bg-white text-red-600 rounded-2xl"> <FaYoutube/></p>



</div> {/* flex justify-center items-center gap-3   */}


</motion.div> {/* container mx-auto px-6 lg:px-12  */}


</section> //{/*  py-14 bg-gradient-to-r from-[#2B2B2B] to-[#C08B5C]  */}

)



}

