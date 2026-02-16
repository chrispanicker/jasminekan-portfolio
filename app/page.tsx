import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { getProjects } from "@/sanity/lib/queries";
import { Project } from "@/sanity/lib/types";
import { Suspense } from "react";

export const myGrid = `grid grid-cols-8`;

export const linkClass = `text-blue-600 hover:underline`;

export default async function Home() {
  const myProjects: Project[] = await getProjects();
  return (
    <main className={`w-screen px-16`}>
      <Header />
      <Suspense>
        <Gallery projects={myProjects} />
      </Suspense>
    </main>
  );
}
