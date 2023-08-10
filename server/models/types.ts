export type Games = {
  id: number;
  name: string;
  brand: string;
  timeline: Date;
};

export type Movies = {
  id: number;
  name: string;
  genre: string;
  timeline: Date;
};

export type Schema = {
  id: number;
  type: "TV" | "MOVIE" | "GAME";
  name: string;
  path: string;
};

export type Tv = {
  id: number;
  name: string;
  genre: string;
  channel: string;
  timeline: Date;
};

export type User = {
  id?: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type Contact = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
};
