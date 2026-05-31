"use client";

import { Provider } from "react-redux";

import { store } from "./store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <Provider store={store}>

      {children} 

    </Provider>

// دة هنا مش زاي ريأكت عملنا بروفيدر ملف لوحدة عشان خاطر لو حطيتوة في لاي اويت هيضربلي ايرورر عشان خاطر فية هوكس وبتستخدم فونشينات لهو عشان كدة مشتغلش في لاي اويت  

  );
}