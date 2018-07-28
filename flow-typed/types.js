// Utility for withStyles in material-ui
declare type Classes = { +[string]: string };

declare type Project = {
  id: number,
  title: string,
  link: string,
  image?: string,
  start: Date,
  end: ?Date,
  tags: Array<string>,
  featured: boolean,
  description: string,
};

declare type Talk = {
  id: number,
  title: string,
  event: string,
  date: Date,
  link: ?string,
  slide: ?string,
};
