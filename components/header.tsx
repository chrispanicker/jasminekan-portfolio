'use client'
import { linkClass, myGrid } from "@/app/page";

export function Header({ info }: { info: { title: string, shareimage: string, contactEmail: string, resumeLink: string, bio: Array<any> } }) {
  // Get the first block's children and render as inline text
  const firstBlock = info.bio && info.bio[0];
  const inlineText = firstBlock?.children?.map((child: any) => child.text).join('') || '';

  return (
    <header className={`top-0 left-0 w-full h-fit ${myGrid} gap-8 z-100 border-b-1 border-black py-8 pt-16 bg-[var(--background)]`}>
      <div className="col-span-1 lg:block hidden"></div>
      <div className="lg:col-span-4 col-span-4 font-semibold">
        <h3 className="w-full font-semibold">
          {inlineText} Contact her via{' '}
          <a
            id="email"
            className="cursor-pointer"
            style={{ display: 'inline', whiteSpace: 'nowrap' }}
            onClick={() => {
              let emailButton = document.getElementById("email");
              if (!emailButton) return;
              navigator.clipboard.writeText(info.contactEmail);
              emailButton.innerHTML = "Copied to clipboard";
              setTimeout(() => {
                emailButton.innerHTML = info.contactEmail;
              }, 1000);
            }}
          >
            {info.contactEmail}
          </a>
          .
        </h3>
      </div>
      <div className="col-span-2 lg:block hidden"></div>
      <div className="col-span-1 flex flex-col justify-end items-start">
        <a target="_blank" href={info.resumeLink} className={`${linkClass}`}>Resumé</a>
        <a target="_blank" href="https://www.are.na/jasmine-kan-dnfnqol3ssi/channels" className={`${linkClass}`}>Are.na</a>
        {/* <a href="" className={`${linkClass}`}>Archive</a> */}
      </div>
    </header>
  );
}