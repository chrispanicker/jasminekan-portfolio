type SanityAssetReference = {
  _ref: string
  _type: 'reference'
}

type ProjectImage = {
  _key: string
  _type: 'image'
  asset: SanityAssetReference
  alt?: string
}

type LegacySanityVideo = {
  _key: string
  _type: 'file'
  asset: SanityAssetReference
  alt?: string
}

type MuxVideo = {
  _key: string
  _type: 'muxVideo'
  asset: {
    playbackId?: string
    status?: string
    thumbTime?: number
    aspectRatio?: string
  } | null
}

export type Project = {
  _key: string;
  title: string;
  slug: {
    current: string;
  };

  type: string;
  year: string;

  description: {
    _type: 'block';
    children: {
      text: string;
    }[];
  }[];
  media: (ProjectImage | LegacySanityVideo | MuxVideo)[];
  preview: {
    _key: string;
    _type: 'image';
    asset: SanityAssetReference;
    alt?: string;
  };

}