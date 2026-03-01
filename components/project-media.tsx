'use client'
import { Project } from "@/sanity/lib/types"
import { useRouter, useSearchParams } from "next/navigation";
import { MediaItem } from "./media";

export const ProjectMedia = ({ project }: { project: Project }) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const projectSlug = searchParams.get("project");
  const mediaHeight = "h-[40rem]";

  return (
    <div className="relative">
      {/* ARROWS */}
      <span className={`absolute  ${mediaHeight} lg:items-center items-end pb-4 z-100 justify-between lg:w-[108%] lg:left-[-4%] top-auto w-[100%] ${projectSlug === project.slug.current ? "flex" : "hidden"} transition-opacity ease-in-out duration-300 pointer-events-none text-black`}>
        <button className={`pointer-events-auto cursor-pointer text-3xl px-2 pb-1 border-1 hover:border-solid border-dashed border-black duration-300 ${project.media.length===1? "hidden":"block"}`}
        onClick={(e)=>{
          let mediaSection = document.getElementById(`media-${project.slug.current}`);
          if(mediaSection && mediaSection.scrollLeft === 0){
            mediaSection.scrollTo({ left: mediaSection.scrollWidth, behavior: 'smooth' })
          }else{
            mediaSection?.scrollBy({ left: -300, behavior: 'smooth' })
          }
        }}>&larr;</button>
        <button className={`pointer-events-auto cursor-pointer text-3xl px-2 pb-1 border-1 hover:border-solid border-dashed border-black duration-300 ${project.media.length===1? "hidden":"block"}`} 
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
      <section id={`media-${project.slug.current}`} className={`relative flex ${project.media.length===1? "justify-center":"justify-start"} w-full overflow-y-hidden gap-4 overflow-x-auto snap-x snap-mandatory transition-all duration-300 ease-in-out  ${projectSlug === project.slug.current ? `${mediaHeight}` : "h-0"}`} onClick={() => router.push(`/?project=${project.slug.current}`)}>
        <div className={`${mediaHeight} flex pb-4 gap-4`}>
        {project.media?.map((mediaItem, i) => {
          return <MediaItem key={i} mediaItem={mediaItem} />;
        })}
        </div>
      </section>
    </div>
  )
}