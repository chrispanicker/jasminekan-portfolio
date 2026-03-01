'use client'
import { linkClass, myGrid } from "@/app/page";

export function Footer({ info }: { info: { title: string, shareimage: string, contactEmail: string, resumeLink: string, bio: Array<any> } }) {
  // Get the first block's children and render as inline text
  const firstBlock = info.bio && info.bio[0];
  const inlineText = firstBlock?.children?.map((child: any) => child.text).join('') || '';

  return (
    <footer className={`w-full h-fit ${myGrid} gap-8 z-100 py-8 pb-16 bg-[var(--background)]`}>
      <div className="col-span-1 lg:block hidden"></div>
      <h3 className="col-span-4 font-semibold ">Jasmine Kan</h3>
      <a id="footeremail" className="cursor-pointer col-span-2" onClick={() => {
          let emailButton = document.getElementById("footeremail");
          if (!emailButton) return;
          navigator.clipboard.writeText(info.contactEmail);
          emailButton.innerHTML = "Copied to clipboard";
          setTimeout(() => {
            emailButton.innerHTML = info.contactEmail;
          }, 1000);
        }}
      >{info.contactEmail}</a>
      <h3 className="col-span-1">©2026</h3>
    </footer>
  );
}