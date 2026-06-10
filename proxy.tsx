import { NextRequest , NextResponse } from "next/server";


export default function MiddleWare (request : NextRequest) {


const token = request.cookies.get("token")?.value


const role = request.cookies.get("role")?.value // كوكيز بترجع اوبجيكت جواها نيم وفاليو


const IsAdminRoute = request.nextUrl.pathname.startsWith("/admin")// بقولوة وديني على صفحة ادمن على طول لو يو ار ال بيبدأ بأدمن 


// هنضرب عصفورين بحجر هنقولوة لو ادمن ودية لصفحة ادمن ولو مفيش توكين او رول ودية لصفحة لوجين

if(IsAdminRoute && (!token || role !== "admin")){

return NextResponse.redirect(new URL("/" , request.url)) // بقولوة رجعلي رد سيرفر يعني ودية لصفحة رئيسية لو هو مش ادمن ومفيش رورل ولا توكين




}

return NextResponse.next() // بقولوة كمل لو ادمن خلية يبرتع براحتوة ويكمل
 



}

export const config = {

 matcher : ["/admin/:path*"]

}
