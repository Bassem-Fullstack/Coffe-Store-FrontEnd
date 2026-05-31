


const Base_URL = "https://coffe-store-backend-seven.vercel.app"

export interface AllProducts {

 _id: string ,   
 name: string,
  price: number,

  images: {

   url : string ,

   public_id : string ,

   _id : string 

  } [] , 

  category: {
    
    _id : string,

   name : string ,

   image : {
     url : string , 

     public_id : string
      
   }

  }, 
  
  description: string ,

  stock : number

}


///////////////////////////////////////////////////////////////////////////////////////////////////////

export interface AllCategories {

_id: string , 

 name: string,

 image : {
   
  url : string ,

  public_id : string

 },
 
  createdBy: string,

}


//////////////////////////////////////////////////////////////////////////////////////// 

export interface LimtedProducts {

  category : {
    
    _id : string ,

    name : string ,

    image : {

      url :string ,

      public_id : string 
    },

  }


  products : {

   _id : string ,

   name : string ,

   description : string, 

   price : number ,

   images : {
    
    url : string ,

   public_id : string 


   }[]

  }[]

}

/////////////////////////////////////////////////////////////////////////////////////////////////////// 

export async function getProducts () : Promise<AllProducts[]> {

const res = await fetch(`${Base_URL}/products` , {

  next : {revalidate : 60} // بقولوة هاتلي بيانات بسرعة في ستين ثانية واحفظها افرض عندك مستخدمين كتير بتقلل ضغط على سيرفر شواية وبجبلك البيانات بسرعة

})

if (!res.ok) {
 
  // بقولوة لو كود مش تمام ارميلي ايرورر على طول ان انت معرفتش توصل للينك بيانات بتاع باك اند

  throw new Error("Failed to fetch products")
}


return res.json()

}


///////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getCategories () : Promise<AllCategories[]> {

const res = await fetch(`${Base_URL}/categories` , {

  next : {revalidate : 60} 
})


if (!res.ok) {
 
  // بقولوة لو كود مش تمام ارميلي ايرورر على طول ان انت معرفتش توصل للينك بيانات بتاع باك اند

  throw new Error("Failed to fetch categories")
}

return res.json()


}


///////////////////////////////////////////////////////////////////////////////////////////////////////


export async function getProductsByCategory ( categoryId : string ) : Promise<AllProducts[]> {


const res = await fetch(`${Base_URL}/products?category=${categoryId}` , {

  next : {revalidate : 60}
    
}) // الفكرة ببساطة بناخد الايدي بتاع فئة عشان نقدر من خلالها نعرض منتجات بتاعنا


if(!res.ok) {

 throw new Error("Failed to fetch products by category")
}


return res.json();

}



///////////////////////////////////////////////////////////////////////////////////////

export async function getLimtiedProducts () : Promise<LimtedProducts[]>  {

const res = await fetch(`${Base_URL}/products/with-product` , {

 next : {revalidate : 60}
   
})


if(!res.ok) {

 throw new Error("Failed to fetch products by category")
}



// هنا انا بقولوة نوع بيانات هتكون مصفوفة جواها الرد اللى جاي من اييباي 


 return res.json()

}


////////////////////////////////////////////////////////////////////////////////////// 


export async function getProductById (id:string) : Promise<AllProducts> {


const res = await fetch(`${Base_URL}/products/${id}` , {

next:{revalidate : 60} // احفط داتا في كاتش لان كل ما يوزير جديد يضغط على منتج وينتقل دة هيتقل السيرفر والصفحة فبقولوة احفظوة في كاش لمدة دقيقة بحيث لو مستخدم حب يجيب بيانات بتاعتة يجيبها من موقع يلاقيها محفوظة في كاش بدل ما يروح كل شواية يجيب بيانات من سيرفر ويبقي بطئ

}) // بجيب الايدي اللى مستخدم ضغط علية في يو ار ال وفروند بعتهولي


if(!res.ok){

throw new Error  ("Failed to fetch product")

}


return res.json()


}