import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { getInfo, getProjects } from "@/sanity/lib/queries";
import { Project } from "@/sanity/lib/types";
import { Suspense } from "react";

export const myGrid = `grid lg:grid-cols-8 grid-cols-5`;

export const linkClass = `text-blue-600 hover:underline`;

// Revalidate cache every 60 seconds
// export const revalidate = 60;

export default async function Home() {
  const myProjects: Project[] = await getProjects();
  const myInfo = await getInfo();
  return (
    <main className={`w-screen lg:px-32 px-4 leading-[1.2rem]`} >
      <Suspense>
        <Header info={myInfo} />
        <Gallery projects={myProjects} />
        <Footer info={myInfo} />
      </Suspense>
    </main>
  );
}
