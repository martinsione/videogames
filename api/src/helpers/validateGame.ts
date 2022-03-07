import { IVideogame } from "../types";

interface errors {
  field: string;
  msg: string;
  required: boolean;
}

const isValidDate = (value: string | number) => {
  const dateWrapper = new Date(value);
  return !isNaN(dateWrapper.getDate());
};

export const validateGame = ({
  name,
  description,
  platforms,
  genres,
  image,
  rating,
  released,
}: Partial<IVideogame>) => {
  const errors: errors[] = [];
  if (
    typeof name !== "string" ||
    name?.trim().length < 6 ||
    name?.trim().length > 100
  )
    errors.push({
      field: "name",
      msg: "Name should be an string between 6 and 100 characters",
      required: true,
    });
  if (
    typeof description !== "string" ||
    description?.trim().length < 10 ||
    description?.trim().length > 2000
  ) {
    errors.push({
      field: "description",
      msg: "Description should be an string between 10 and 2000 characters",
      required: true,
    });
  }
  if (
    !platforms ||
    !Array.isArray(platforms) ||
    !platforms.every((item: any) => typeof item === "string")
  ) {
    errors.push({
      field: "platforms",
      msg: "Platforms should be an array of strings",
      required: true,
    });
  }
  if (
    !genres ||
    !Array.isArray(genres) ||
    // Check if it is an array of integers
    genres.some((i: any) => !Number.isInteger(Number(i)))
  ) {
    errors.push({
      field: "genres",
      msg: "Genres should be an array of integers",
      required: true,
    });
  }
  if (
    !rating ||
    rating < 1 ||
    rating > 5 ||
    !Number.isInteger(Number(rating))
  ) {
    errors.push({
      field: "rating",
      msg: "Rating should be an integer between 1 and 5",
      required: false,
    });
  }
  if (!released || !isValidDate(released)) {
    errors.push({
      field: "released",
      msg: "released should be a valid date",
      required: false,
    });
  }
  if (!image) {
    errors.push({
      field: "image",
      msg: "image should be a valid image url",
      required: false,
    });
  }
  return errors;
};
