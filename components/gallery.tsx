import { Project } from "@/sanity/lib/types";
import { ProjectInfo } from "./project-info";
import { ProjectMedia } from "./project-media";

export function Gallery({ projects }: { projects: Array<Project> }) {
  return (
    <section id="gallery" className={`w-full flex flex-col`}>
      {projects.map((project: Project) => (
        <div key={project.slug.current} className={`group w-full h-fit flex flex-col border-b-2 border-black`}>
          <ProjectMedia project={project} />
          <ProjectInfo project={project} />
        </div>
      ))} 
    </section>
  )
}