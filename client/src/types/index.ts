export interface IGame {
  id: number;
  name: string;
  image: string;
  genres: string[];
  rating: number;
}

export interface IGameDetail extends IGame {
  description: string;
  released?: string;
  platforms: string[];
  createdInDb?: boolean;
}

export interface IGenre {
  id: number;
  name: string;
}
