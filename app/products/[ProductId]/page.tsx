import ProductDetails from "@/components/pageProduct"
import { getProductById } from "@/lib/api"

import Image from "next/image"



export default async function PageProduct ({params} : {

params : {

    ProductId : string 

}})


{


  const {ProductId} = await params // دة اسم فولدر بتاع نيكست جيس اللى احنا عملناة اسم فولدر دة مش داخل مصفوفة انما بنقولوة ان دي قيمة متغيرة بنجيب الايدي من البارميس والبارميس دة اللى هو شريط يو ار ال الايدي بيظهر فية فوق في شريط يو ار ال بنجيبوة هنا نبصية ونتأكد من المنتجات ولو هو هو نفس الايدي متخزن في مونجو ديبي في شريط يو ار ال يرجعلنا المنتج الخاص بالايدي دة


 const getPageProduct = await getProductById(ProductId) 
   
 
 return <ProductDetails product={getPageProduct} />




}