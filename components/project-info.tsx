'use client'
import { Project } from "@/sanity/lib/types";
import { PortableText } from "next-sanity";
import { myGrid } from "@/app/page";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useRouter, useSearchParams } from "next/navigation";

export const ProjectInfo = ({ project }: { project: Project }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectSlug = searchParams.get("project");

  return (
    <section key={project.slug.current + "-info"} id={`info-${project.slug.current}`} className={`${myGrid} w-full h-full z-10 py-8 gap-8 cursor-pointer relative`}
    onClick={()=>{
      projectSlug === project.slug.current ? router.push(`/`) : router.push(`/?project=${project.slug.current}`)
    }}>
        {project.media?.length > 0 && (
          <Image 
            src={urlFor(project.media[0].asset._ref).url()}
            alt={`${project.title} cover image`}
            width={1080}
            height={1920}
            className="w-[12rem] h-auto object-cover col-span-1"
          />
        )}
        <div className="w-full h-full flex flex-col col-span-4 justify-start items-between">
          <button className="w-full font-bold tracking-tight hover:underline cursor-pointer text-left">{project.title}</button>
          <br></br>
          <PortableText value={project.description} />
        </div>
        {project.type && <p className="col-span-2">{project.type}</p>}
        {project.year && <p className="col-span-1">{project.year}</p>}
    </section>
  )

}