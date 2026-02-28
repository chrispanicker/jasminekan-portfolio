'use client'
import { urlFor } from "@/sanity/lib/image";
import { Project } from "@/sanity/lib/types"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation";

export const ProjectMedia = ({ project }: { project: Project }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectSlug = searchParams.get("project");
  const mediaHeight = "h-[30rem]";

  return (
    <div className="relative">
      {/* ARROWS */}
      <span className={`absolute top-0 ${mediaHeight} items-center z-100 justify-between w-[100%] ${projectSlug === project.slug.current ? "flex" : "hidden"} transition-opacity ease-in-out duration-300 pointer-events-none text-black`}>
        <button className={`pointer-events-auto cursor-pointer text-3xl bg-[var(--background)] px-2 pb-1 hover:text-[var(--background)] hover:bg-black transition-colors duration-300 ${project.media.length===1? "hidden":"block"}`}
        onClick={(e)=>{
          let mediaSection = document.getElementById(`media-${project.slug.current}`);
          if(mediaSection && mediaSection.scrollLeft === 0){
            mediaSection.scrollTo({ left: mediaSection.scrollWidth, behavior: 'smooth' })
          }else{
            mediaSection?.scrollBy({ left: -300, behavior: 'smooth' })
          }
        }}>&larr;</button>
        <button className={`pointer-events-auto cursor-pointer text-3xl bg-[var(--background)] px-2 pb-1 hover:text-[var(--background)] hover:bg-black transition-colors duration-300 ${project.media.length===1? "hidden":"block"}`} 
        onClick={(e)=>{
          let mediaSection = document.getElementById(`media-${project.slug.current}`);
          console.log(`${mediaSection!.scrollLeft >= mediaSection!.scrollWidth - mediaSection!.clientWidth-1}`)

          if(mediaSection && mediaSection.scrollLeft >= mediaSection.scrollWidth - mediaSection.clientWidth - 1){
            mediaSection.scrollTo({ left: 0, behavior: 'smooth' })
          }else{
            mediaSection?.scrollBy({ left: 300, behavior: 'smooth' })
          }
          }}>&rarr;</button>
      </span>
      <section id={`media-${project.slug.current}`} className={`px-[3rem] relative flex ${project.media.length===1? "justify-center":"justify-start"} w-full overflow-y-hidden gap-4 overflow-x-auto snap-x snap-mandatory transition-all duration-300 ease-in-out border-black  ${projectSlug === project.slug.current ? `${mediaHeight}` : "h-0"}`} onClick={() => router.push(`/?project=${project.slug.current}`)}>
        <div className={`${mediaHeight} flex`}>
        {project.media?.map((mediaItem) => {
          if (mediaItem._type === "image") {
              return (
              <Image 
              key={mediaItem._key} 
              src={urlFor(mediaItem.asset._ref).url()} 
              alt={mediaItem.alt || "Project media"} 
              width={1080} 
              height={1920} 
              className="w-auto max-w-[80vw] h-full object-contain snap-center snap-always pr-4 py-4  last:pr-0" />
              );
          }else if (mediaItem._type === "file") {
              return (
              <video>
                <source src={mediaItem.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>)
          }
        })}
        </div>
      </section>
    </div>
  )
}