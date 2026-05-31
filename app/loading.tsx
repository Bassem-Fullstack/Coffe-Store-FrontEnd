


export default function Loading() {



  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#4B2E2B] text-[#FAF7F0]">
      
      {/* كوب قهوة */}
      <div className="text-6xl animate-bounce">☕</div>

      {/* نص */}
      <h1 className="mt-4 text-xl font-semibold text-[#EADBC8]">
       Loading...
      </h1>

      <p className="text-sm text-[#C08B5C] mt-2">
        Please wait while we load your page
      </p>

      {/* Loading bar */}
      <div className="w-48 h-2 bg-[#EADBC8] rounded mt-6 overflow-hidden">

        <div className="h-full bg-[#4B2E2B]/60 animate-loadingBar"></div>
      </div>
    </div>
  );
}