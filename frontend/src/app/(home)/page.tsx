import { NavBar } from "@/components/shared";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex justify-center items-center w-full max-w-[1100px] m-auto h-[calc(100%-80px)]">
          <div className="flex w-full justify-center items-center">
            <div className="w-full max-w-md px-6 hover:scale-105 md:hover:-rotate-6 transition-all">
              <h1 className="text-2xl font-bold mb-4 md:mb-0">
                Find better opportunities for your future!
              </h1>
              <p className="mb-4">
                Welcome to Counselling.com, your digital sanctuary for emotional
                well-being. Our innovative platform harnesses the power of
                artificial intelligence to provide you with personalized
                counseling and support, anytime and anywhere. Whether you&apos;re
                navigating life&apos;s challenges or seeking to enhance your mental
                wellness, our empathetic AI companions are here to listen, guide,
                and empower you on your journey. Experience the future of mental
                health care with confidential, accessible, and tailored
                conversations. Join us today to take the first step towards a
                brighter tomorrow!
              </p>
              <Link href={"/details/personal"} className="btn btn-primary w-full">Get Started</Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center w-full">
            <Image src={"/hero.jpg"} width={1280} height={720} alt="hero i" className="max-w-md rounded-3xl hover:scale-105 hover:rotate-6 transition-all" />
          </div>
      </main>
    </>
  );
}
