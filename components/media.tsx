'use client'
import { getFileUrl } from "@/sanity/lib/file";
import { urlFor } from "@/sanity/lib/image";
import { Project } from "@/sanity/lib/types"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const MediaItem = ({ mediaItem }: { mediaItem: any }) => {
  const [loaded, setLoaded] = useState(false);
  const blurClass = loaded ? "blur-none" : "blur-xl";
  const transitionClass = "duration-300 transition-all";

  if (mediaItem._type === "image") {
    const imageUrl = urlFor(mediaItem.asset._ref).url() ?? undefined;
    return (
        <Image
          key={mediaItem._key}
          src={imageUrl}
          alt={mediaItem.alt || "Project media"}
          width={1080}
          height={1920}
          onLoad={() => setLoaded(true)}
          className={`w-auto max-w-[100%] h-full object-contain snap-center snap-always ${blurClass} ${transitionClass}`}
        />
    );
  } else if (mediaItem._type === "file") {
    if (!mediaItem.asset || !mediaItem.asset._ref) return null; // Skip if asset reference is missing
    const fileUrl = getFileUrl(mediaItem) ?? undefined;
    return (
        <video
          key={mediaItem._key}
          className={`w-auto max-w-[100%] h-full object-contain snap-center snap-always ${blurClass} ${transitionClass}`}
          onCanPlay={() => setLoaded(true)}
          controls
          muted
          loop
          autoPlay
        >
          <source src={fileUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
    );
  }
}