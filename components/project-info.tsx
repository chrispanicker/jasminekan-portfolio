'use client'
import { Project } from "@/sanity/lib/types";
import { PortableText } from "next-sanity";
import { myGrid } from "@/app/page";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const ProjectInfo = ({ project }: { project: Project }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectSlug = searchParams.get("project");

  const [loaded, setLoaded] = useState(false);
  const blurClass = loaded ? "blur-none" : "blur-xl";
  const transitionClass = "duration-300 transition-all";

  return (
    <section key={project.slug.current + "-info"} id={`info-${project.slug.current}`} className={`${myGrid} row-reverse group duration-500 w-full h-full z-10 py-8 gap-8 relative ${projectSlug === project.slug.current ? "cursor-zoom-out" : "cursor-zoom-in"}`}
    onClick={(e)=>{
      e.stopPropagation(); // Prevent the click from bubbling up to the main container
      if (projectSlug === project.slug.current) {
        router.push("/", { scroll: false });
      } else {
        router.push(`/?project=${project.slug.current}`, { scroll: false });
        let projectSection = document.querySelector(`#project-${project.slug.current}`); 
        setTimeout(() => {
          projectSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    }}>
        {project.preview && (
          <Image 
            src={urlFor(project.preview.asset._ref).url()}
            alt={`${project.title} cover image`}
            width={1080}
            height={1920}
            className={`w-[12rem] h-auto object-contain col-span-1 max-h-[10rem] self-center lg:order-first order-2 ${blurClass} ${transitionClass}`}
            onLoadingComplete={() => setLoaded(true)}
          />
        )}
        <div className="w-full h-full flex flex-col col-span-4 justify-start items-between">
          <button className="w-full font-semibold tracking-tight group-hover:underline cursor-pointer text-left">{project.title}</button>
          <br></br>
          <PortableText value={project.description} />
        </div>
        {project.type && <p className="col-span-2 lg:block hidden">{project.type}</p>}
        {project.year && <p className="col-span-1 lg:block hidden">{project.year}</p>}
    </section>
  )

}