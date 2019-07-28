export type Affiliation = {
  name: string,
  type: string,
  link: string,
}

export type Contributon = {
  name: string,
  link: string,
  roles: string[],
}

export type Link = {
  title: string,
  url: string,
  icon: string | string[],
  color?: string,
}

export type Misc = {
  id: number,
  title: string,
  subtitle: string,
  date: Date,
  link: string,
  featured: boolean,
}

export type Project = {
  id: number,
  title: string,
  image: string,
  start: Date,  // TODO improve
  end: Date | null,
  tags: string[],
  featured: boolean,
  description: string,
  description_ja?: string,
  links: object,  // TODO improve
}

export type Research = {
  title: string,
  link: string | null,
  tags: string[],
}

export type Talk = {
  id: number,
  title: string,
  event: string,
  date: Date,
  link: string | null,
  slide: string | null,
}

export type Work = {
  id: number,
  title: string,
  company: string,
  link: string | null,
  start: Date,
  end: Date | null,
  featured: boolean,
}
