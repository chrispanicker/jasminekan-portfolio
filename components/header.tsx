'use client'
import { linkClass, myGrid } from "@/app/page";

export function Header (){
  return (
    <header className={`sticky top-0 left-0 w-full h-fit ${myGrid} gap-4 z-100 border-b-2 border-black py-8 bg-[var(--background)]`}>
        {/* <div className="col-span-1"></div> */}
        {/* fill with portable text */}
        <div className="col-span-5">
          <h1 className="font-bold">Jasmine Kan</h1>
          <h3 className="w-full">
            A Brooklyn-based designer. Her practice spans across editorial, web, digital design, creative coding and printmaking. She often works in the cross sections between film and design, print and web, knitting and code. Contact her via jasminekan144@gmail.com.
          </h3>
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-1 flex flex-col justify-end items-start">
          <a href="" className={`${linkClass}`}>Resumé</a>
          <a href="" className={`${linkClass}`}>Are.na</a>
          <a href="" className={`${linkClass}`}>Archive</a>
        </div>
    </header>
  )
}