import { Starship } from "./starship";

export type Player = {
  score: number;
  cards: Starship[];
  isActive: boolean;
};
