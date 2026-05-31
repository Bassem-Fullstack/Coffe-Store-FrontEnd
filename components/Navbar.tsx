"use client"

import Image from "next/image"

import Link from "next/link";

import { motion } from "motion/react"

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";


import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CartIcon = ({ cartCount, onClick }: { cartCount: number, onClick: () => void }) => (
  <button onClick={onClick} className="relative">
    <i className="fa-solid fa-cart-shopping text-lg" />
    {cartCount >= 0 && (
      <span className="absolute -top-3 -right-4 bg-[#C08B5C] text-xs px-2 py-0.5 rounded-full">
        {cartCount}
      </span>
    )}
  </button>
)
export default function Navbar() {

  const [user , setUser] = useState<string |null>(null)
  
  
  const [open, setOpen] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const linkStyle ="inline-block text-[#FAF7F0] py-1 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C08B5C] hover:after:w-full after:transition-all after:duration-300";

  const mobileLinkStyle ="px-3 py-2 rounded-md text-[#FAF7F0] font-medium transition-all duration-300 hover:bg-[#C08B5C] hover:text-[#0D0D1A]";

 const router = useRouter()

const [activeSection , setactiveSection] = useState("home")

const { cart } = useSelector((state: { Carts: { cart: any[] } }) => state.Carts)


const cartCount = cart.length 

useEffect(() => {

const handleScroll = ()=> {


const allSections = document.querySelectorAll("section")


allSections.forEach((eachSection) => {


const top = window.scrollY // هنبدا نستدعي كل سكاشن اي سكشين وبعدها نستدعي الايدي بتاعها انا هنا بحدد المكان اللى انا واقف اية انا واقف في سكورول قد اية فين حالا
  

const offset = eachSection.offsetTop -200 // بحدد ارتفاع الطول بتاع سيكشن فقط عشان نقارنها بالارتفاع سكيشن كلة مع ارتفاع السيكشن سكورول اللى انا واقف في حالا دة بيحدد ارتفاع سكيشن من فوق فقط ناقصنا من 200 عشان خاطر لما اجي الون الخط يتلون بدري قبل ما يوصل لسيشكن بتاعي بالاسكورول


const height = eachSection.offsetHeight // بحدد ارتفاع سكيشن كلة على بعضة من طول والعرض من فوق وتحت لكن فوق كنت بحدد ارتفاعة من فوق فقط عشان يعرف ينزل قد اية بظبط

const id = eachSection.getAttribute("id") // بجيب الايدي بتاع سيكشن عشان نبدأ نقارن ونعرض انهي سكيشن عندة نفس الايدي


if( top >= offset && top < height + offset ){

 
// هنا بقولوة لو رقم توب سكورول اللى انا واقف علية حاليا في سيكشن اكبر من او يساوي سيكشن ارتفاع طول سيكشن دة شرط اول والشرط تاني بقولوة لو التوب اكبر من ارتفاع طول ارتفاع سيكشن من فوق واجمعهول مع ارتفاع سيكشن كلة الهدف احنا بنتأكد ان بداية سيكشن خط يتلون ونهاية سيكشن يخرج من سيكشن ازاي يخرج من سيكشن نجمع سيكشن توب اللى حنا واقفين مع سيكشن ارتفاع سيكشن كلة 

setactiveSection(id || "") // حطيت هنا او شرط في حالة لو الايدي مش موجود و رجع قيمة نال مش موجودة اصل عمو تايب سكريبت حساس جدا لازم اكتب بتفصيل كدة عشان ميضربليش ايرورر

}


})

}



window.addEventListener("scroll" , handleScroll)

return ()=> window.removeEventListener("scroll" , handleScroll)



} , [])



useEffect(() => {


const token = localStorage.getItem("token")


if(token){

  setUser(token)
}


} , [])



const handleLogOut = () => {

localStorage.removeItem("token")

setUser(null)

router.push("/")

}



const handleCartClick = () => {
  const token = localStorage.getItem("token")
  
  if (!token) {
    toast.error("Please login or register first! 🔐")
  
    return
  }
  
  router.push("/cart")
}



return (

    <motion.nav

      className="bg-[#4B2E2B] text-[#FAF7F0] px-8 py-3 flex items-center justify-between fixed top-0 left-0 w-full z-50"

      initial={{ opacity: 0, y: -90 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.6 }}
    >

      {/* Logo */}

      <div className="flex gap-3 items-center">
        <Image
          src="/logo3.png"
          alt="Coffee Store Logo"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />

        <span className="text-[#C08B5C] md:text-2xl text-lg font-bold">Coffee Store</span>

      </div>   {/* flex gap-3 items-center */}


      {/* Desktop Links */}

      <motion.ul

        className="hidden md:flex justify-center flex-1 items-center  gap-6"

        initial={{ opacity: 0, y: -80 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.8 }}
      
      >
        
        <li><Link className={`${linkStyle} ${activeSection ==="home" ? "after:w-full text-[#C08B5C]":""}`} href="/#home">Home</Link></li>

        <li><Link className={`${linkStyle} ${activeSection ==="about" ? "after:w-full text-[#C08B5C]":""}`} href="/#about">About Us</Link></li>

        <li><Link className={`${linkStyle} ${activeSection ==="categories" ? "after:w-full text-[#C08B5C]":""}`} href="/#categories">Categories</Link></li>

        <li><Link className={`${linkStyle} ${activeSection ==="offers" ? "after:w-full text-[#C08B5C]":""}`} href="/#offers">Offers</Link></li>


        <li className="relative z-50">

          <CartIcon cartCount={cartCount} onClick={handleCartClick} />

        </li>

      </motion.ul> {/* hidden md:flex justify-center flex-1 */}


      {/* Desktop Auth */}

      {user ? (
        <div className="relative hidden md:block">

          <button
            onClick={() => setOpen(!open)}

            className="flex items-center gap-2 bg-[#C08B5C] px-4 py-2 rounded-full"
          >

            <i className="fa-regular fa-user"></i>

            User

          </button>


          {open && (

            <motion.div
              className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50"

              initial={{ opacity: 0, y: -20 }}
              
              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 0.3 }}
            >
              <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>

              <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>

<button onClick={handleLogOut} className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">

 Logout

</button>
      
            </motion.div> //{/* absolute right-0 mt-2 w-40 */}
          )}

        </div> //{/* relative hidden md:block */}

       ) : (
        <motion.div
          className="hidden md:flex gap-5"

          initial={{ opacity: 0, y: -80 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.85 }}
        >
          <Link href="/login" className="bg-[#C08B5C] px-2 py-1 rounded-full border border-transparent hover:border-[#C08B5C] hover:bg-[#4B2E2B] transition-all duration-300">Login</Link>

          <Link href="/register" className="bg-[#C08B5C] px-2 py-1 rounded-full border border-transparent hover:border-[#C08B5C] hover:bg-[#4B2E2B] transition-all duration-300">Register</Link>

        </motion.div> //{/* hidden md:flex gap-5 */}
      )}

      {/* Mobile: Cart + Hamburger */}
      <div className="md:hidden flex items-center gap-6">

        <CartIcon cartCount={cartCount} onClick={handleCartClick} />

        <button
          onClick={() => setMobileOpen(!mobileOpen)}

          className={`w-8 text-2xl transition-transform duration-300 ${mobileOpen ? "rotate-180" : "rotate-0"}`}

        >

          {mobileOpen ? "✖" : "☰"}

        </button>

      </div> {/* md:hidden flex items-center gap-6 */}


      {/* Mobile Menu */}

      {mobileOpen && (

        <motion.div

          className="md:hidden absolute top-16 left-0 w-full bg-[#4B2E2B] text-[#FAF7F0] flex flex-col gap-4 p-6 z-50"

          initial={{ opacity: 0, y: -20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.3 }}
        >
          <Link href="/#home" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>Home</Link>

          <Link href="/#about" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>ِAbout US</Link>

          <Link href="/#categories" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>Categories</Link>
          
          <Link href="/#offers" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>offers</Link>

          <hr className="border-gray-500" />

          {user ? (
            <>
              <Link href="/profile" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>Profile</Link>

              <Link href="/orders" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>Orders</Link>

<button

 onClick={handleLogOut}

 className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"

>

 Logout

</button>
            </>

          ) : (
            <>
              <Link href="/login" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>Login</Link>

              <Link href="/register" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>Register</Link>
            </>
          )}
       </motion.div> //{/* md:hidden absolute top-16 left-0 w-full  */}
      )}

    </motion.nav> //{/* bg-[#4B2E2B] text-[#FAF7F0] px-8 py-3 flex */}
  );
}
