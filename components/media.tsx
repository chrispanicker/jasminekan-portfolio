'use client'

import MuxPlayer from '@mux/mux-player-react'
import { getFileUrl } from "@/sanity/lib/file";
import { urlFor } from "@/sanity/lib/image";
import { Project } from "@/sanity/lib/types"
import Image from "next/image"
import { useState } from "react";

type MediaItemProps = {
  mediaItem: Project['media'][number]
}

export const MediaItem = ({ mediaItem }: MediaItemProps) => {
  const [loaded, setLoaded] = useState(false);
  const blurClass = loaded ? "blur-none" : "blur-xl";
  const transitionClass = "duration-300 transition-all";

  if (mediaItem._type === "image") {
    if (!mediaItem.asset?._ref) return null;
    const imageUrl = urlFor(mediaItem.asset._ref).url() ?? undefined;
    return (
        <Image
          key={mediaItem._key}
          src={imageUrl}
          alt={mediaItem.alt || "Project media"}
          width={1080}
          height={1920}
          onLoad={() => setLoaded(true)}
          className={`w-auto max-w-[100%] h-full object-contain snap-center snap-always rounded-lg ${blurClass} ${transitionClass}`}
        />
    );
  }

  if (mediaItem._type === "file") {
    if (!mediaItem.asset?._ref) return null;
    const fileUrl = getFileUrl(mediaItem) ?? undefined;
    return (
        <video
          key={mediaItem._key}
          className={`w-auto max-w-[100%] h-full object-contain snap-center snap-always rounded-lg ${blurClass} ${transitionClass}`}
          onCanPlay={() => setLoaded(true)}
          controls
          muted
          loop
          playsInline
          preload="none"
        >
          <source src={fileUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
    );
  }

  if (mediaItem._type !== "muxVideo") return null;

  const asset = mediaItem.asset;
  if (!asset?.playbackId || asset.status !== "ready") {
    const status = asset?.status;
    const message = status === "errored" ? "Video processing failed." : "Video is processing.";
    return (
      <div
        className="flex h-full w-[min(80vw,40rem)] shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-sm text-neutral-500"
        role="status"
      >
        {message}
      </div>
    );
  }

  const aspectRatio = asset.aspectRatio?.replace(":", " / ") ?? "16 / 9";
  const poster = asset.thumbTime === undefined
    ? undefined
    : `https://image.mux.com/${asset.playbackId}/thumbnail.jpg?time=${asset.thumbTime}`;

  return (
    <MuxPlayer
      key={mediaItem._key}
      playbackId={asset.playbackId}
      streamType="on-demand"
      preload="none"
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      onCanPlay={() => setLoaded(true)}
      style={{
        height: "100%",
        width: "auto",
        aspectRatio,
        "--controls": "none",
      }}
      className={`max-w-[100%] snap-center snap-always rounded-lg ${blurClass} ${transitionClass}`}
    />
  );
}