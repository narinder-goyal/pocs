import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      {/* Left Content */}
      <div className="space-y-[40px] text-center w-[446px]">
        <h1 className="flex items-center justify-center gap-1 font-jakarta text-[60px] font-semibold text-[#4A4A4A]">
          <Image
            src="/images/logo.svg"
            alt="dhinote logo"
            width={80}
            height={80}
            className=""
          />dhinote
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Instantly capture thoughts as they happen.
          <br />
          <span className="font-medium">Effortless AI enabled organization.</span>
        </p>

        <div className="flex gap-4">
          <Link href="/login" className="px-8 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition w-full">
            Login
          </Link>
          <Link href="/signup" className="px-8 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center justify-center gap-2 w-full">
            Create Account
            <span>›</span>
          </Link>
        </div>

        <p className="text-[16px] text-[#17705C]">
          <span className="d-flex w-[229px] h-[49px] rounded-[48px] py-[14.5px] px-[16px] relative 
           before:content-[''] before:absolute before:top-1/2 before:left-[-50px] before:-translate-y-1/2 before:h-px before:w-[50px] before:bg-[#17705C]
           after:content-[''] after:absolute after:top-1/2 after:right-[-50px] after:-translate-y-1/2 after:h-px after:w-[50px] after:bg-[#17705C]">Download our Mobile App</span>
        </p>

        <div className="flex gap-4">
          <Image
            src="/images/playStore-btn.svg"
            alt="Download on App Store"
            width={160}
            height={50}
            className="w-full h-auto"
          />
          <Image
            src="/images/appleStore-btn.svg"
            alt="Get it on Google Play"
            width={160}
            height={50}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Right Visual */}
      <div className="relative flex justify-center">
        <div className="relative w-full max-w-xl">
          <Image
            src="/images/landing-img.svg"
            alt="Dhinote App UI"
            width={900}
            height={600}
            className=""
          />
        </div>
      </div>
    </div>
  );
}
