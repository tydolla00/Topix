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

export type Users = {
  id?: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
