import {
  StyledHeading,
  StyledCard,
  StyledImage,
  StyledCategories,
} from "./Card-styles";
import Category from "./Category";
import useReadableName from "../hooks/useReadableName";
import { Starship } from "../types/starship";

type Props = {
  cards: Starship[];
  isActive: boolean;
};

const createCategories = (card: Starship) => {
  const cardCategories = Object.fromEntries(
    Object.entries(card).filter(([key]) => {
      return (
        key === "max_atmosphering_speed" ||
        key === "cost_in_credits" ||
        key === "passengers"
      );
    })
  );

  cardCategories.films = card["films"].length;

  return cardCategories;
};

export default function Card({ cards, isActive }: Props) {
  const categories = createCategories(cards[0]);
  return (
    <StyledCard>
      <StyledHeading aria-live="polite">{cards[0].name}</StyledHeading>
      <StyledImage src="./assets/star-wars.webp" alt="star wars logo" />
      <StyledCategories>
        {Object.keys(categories).map((category) => (
          <li key={category}>
            <Category
              isActive={isActive}
              categoryId={category}
              name={useReadableName(category)}
              value={isActive ? String(categories[category]) : "?"}
            />
          </li>
        ))}
      </StyledCategories>
    </StyledCard>
  );
}
