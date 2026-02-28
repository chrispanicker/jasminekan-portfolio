'use client'
import { linkClass, myGrid } from "@/app/page";
import { PortableText } from "next-sanity";

export function Header({ info }: { info: { title: string, shareimage: string, contactEmail: string, bio: Array<any> } }) {
  return (
    <header className={`top-0 left-0 w-full h-fit ${myGrid} gap-8 z-100 border-b-2 border-black py-8 bg-[var(--background)]`}>
        <div className="col-span-1"></div>
        {/* fill with portable text */}
        <div className="col-span-4">
          {/* <h1 className="font-bold">Jasmine Kan</h1> */}
          <h3 className="w-full">
            <PortableText value={info.bio} />
            Contact her via &nbsp;
            <a id="email" onClick={()=>{
                let emailButton = document.getElementById("email");
                emailButton?.addEventListener("click", ()=>{
                if(emailButton?.innerHTML === info.contactEmail){
                let email = emailButton.innerHTML;
                // console.log(email)
                navigator.clipboard.writeText(email)
                emailButton.innerHTML = "Copied to clipboard"
                setTimeout ( ()=>{
                  emailButton.innerHTML = info.contactEmail
                }, 1000);
            }})
                
            }}>{info.contactEmail}</a>.
          </h3>
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-1 flex flex-col justify-end items-start">
          <a target="_blank" href="https://drive.google.com/file/d/1_zLMwB0POF__M4GDwJt4T5O5Ks-PQ6RS/view?usp=drive_link" className={`${linkClass}`}>Resumé</a>
          <a target="_blank" href="https://www.are.na/jasmine-kan-dnfnqol3ssi/channels" className={`${linkClass}`}>Are.na</a>
          {/* <a href="" className={`${linkClass}`}>Archive</a> */}
        </div>
    </header>
  )
}