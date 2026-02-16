'use client'
import { urlFor } from "@/sanity/lib/image";
import { Project } from "@/sanity/lib/types"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation";

export const ProjectMedia = ({ project }: { project: Project }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectSlug = searchParams.get("project");


  return (
    <section id={`media-${project.slug.current}`} className={`flex w-full overflow-y-hidden gap-4 overflow-x-auto snap-x snap-mandatory transition-all duration-300 ease-in-out ${projectSlug === project.slug.current ? "h-[25rem]" : "h-0"}`}>
      <div className={`h-[25rem] flex`}>
      {project.media?.map((mediaItem) => {
        if (mediaItem._type === "image") {
            return (
            <Image 
            key={mediaItem._key} 
            src={urlFor(mediaItem.asset._ref).url()} 
            alt={mediaItem.alt || "Project media"} 
            width={1080} 
            height={1920} 
            className="w-auto h-full object-cover snap-end snap-always pr-4 last:pr-0" />
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
  )
}