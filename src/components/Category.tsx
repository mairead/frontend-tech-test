import { MouseEvent, useContext } from "react";
import { actions } from "../actions/gameActions";
import { GameStateContext } from "../context/gameStateContext";
import { StyledCategory } from "./Category-styles";

type Props = {
  categoryId: string;
  name: string;
  value: string;
  isActive: boolean;
};

export default function Category({ categoryId, name, value, isActive }: Props) {
  const { state, dispatch } = useContext(GameStateContext);

  const onSelectCategory = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    actions.endRound(categoryId)(dispatch);
  };

  return (
    <StyledCategory onClick={onSelectCategory} disabled={!isActive}>
      <span>{name}:</span>
      <span>{value}</span>
    </StyledCategory>
  );
}
