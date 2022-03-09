export interface IGame {
  id: number;
  name: string;
  image: string;
  genres: string[];
  rating: number;
  createdInDb?: boolean;
}

export interface IGameDetail extends IGame {
  description: string;
  released?: string;
  platforms: string[];
}

export interface IGenre {
  id: number;
  name: string;
}
