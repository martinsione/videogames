export interface IPlatform {
  platform: {
    id: number;
    name: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface IGenre {
  id: number;
  name: string;
  [key: string]: any;
}

export interface IVideogame {
  id: number;
  name: string;
  description?: string;
  released?: string;
  rating?: number;
  background_image: string;
  platforms: IPlatform[];
  genre: IGenre[];
  createdInDb?: boolean;
  [key: string]: any;
}

export interface IVideogames {
  count: number;
  next: string | null;
  previous: string | null;
  results: IVideogame[];
}
