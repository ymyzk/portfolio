export interface Affiliation {
  name: string;
  type: string;
  link: string;
}

export interface Contributon {
  name: string;
  link: string;
  roles: string[];
}

export interface Link {
  title: string;
  url: string;
  icon: [string, string];
  color?: string;
}

export interface Misc {
  id: number;
  title: string;
  subtitle: string;
  date: Date;
  link: string;
  featured: boolean;
}

export interface Project {
  id: number;
  title: string;
  image: string | null;
  start: Date; // TODO improve
  end: Date | null;
  tags: string[];
  featured: boolean;
  description: string;
  descriptionJa?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  links: any; // TODO improve
}

export interface Research {
  id: number,
  title: string;
  link: string | null;
  tags: string[];
}

export interface Talk {
  id: number;
  title: string;
  event: string;
  date: Date;
  link: string | null;
  slide: string | null;
}

export interface Work {
  id: number;
  title: string;
  company: string;
  link: string | null;
  start: Date;
  end: Date | null;
  featured: boolean;
}
