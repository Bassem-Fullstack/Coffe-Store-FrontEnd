import CategoriesProducts from "@/components/CategoriesProducts";

import { getProductsByCategory } from "@/lib/api";


export default async function Categories( {params} : {params : {id:string}}) 

// بقولوة هيجيلك حاجة من يو ار ال اسمها سواء منتج مكتوب او ايدي في شريط بحث عشان كدة حطينها في اوبجكيت عشان ممكن يرجع اكتر من قيمة وهنا بعرفة ان نوع بيانات هتكون نص



// id دة اللى جاي من فولدر بتاع الايدي احنا عاملينة [id]


{

const {id} = await params 

const products = await getProductsByCategory(id)

return <CategoriesProducts PassProduct={products}/> ;

// المستخدم يختار منتج في شريط يو ار ال هيظهرلك الايدي بتاع فئات انت كفروند اند تاخدة وتقارنة بالايدي بتاع باك اند وتشوف هو هو نفس الايدي متخزن في داتا بيز ولا لاء



}