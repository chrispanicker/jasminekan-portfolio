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
  media: {
    _key: string;
    _type: 'image' | 'file';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
    url: string;
  }[];

}