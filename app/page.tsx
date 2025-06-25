import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center py-20 px-6 text-center h-[calc(100vh-80px)]">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
        Welcome to{" "}
        <span className="relative text-[#7345fc] ">
          Light It Care
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30"></div>
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-white max-w-3xl mb-10 leading-relaxed">
        Your dedicated partner in health and well-being. At Light It Care, we
        leverage innovation to provide seamless, compassionate, and effective
        healthcare solutions for everyone.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center cursor-pointer">
        <Link href="/dashboard">
          <Button size="lg">Go to Dashboard</Button>
        </Link>
      </div>

      <div className="absolute top-20 left-10 w-20 h-20 rounded-full opacity-10 bg-[#7345fc]"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 rounded-full opacity-10 bg-[#7345fc]"></div>
      <div className="absolute top-1/2 left-5 w-12 h-12 rounded-full opacity-5 bg-[#7345fc]"></div>
    </section>
  );
}
