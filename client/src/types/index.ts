export interface IGame {
  id: number;
  name: string;
  image: string;
  genres: string[];
}

export interface IGameDetail extends IGame {
  description: string;
  release?: string;
  rating?: number;
  platforms: string[];
  createdInDb?: boolean;
}

export interface IGenre {
  id: number;
  name: string;
}
