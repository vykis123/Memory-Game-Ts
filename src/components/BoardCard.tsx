import * as React from "react";

type PropsType = {
  id: number;
  img: string;
  state: string;
  onClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
};

const BoardCard = ({ id, img, state, onClickHandler }: PropsType) => {
  const image: string = new URL(`../img/${img}.png`, import.meta.url).href;
  const cardActionClass: string = state !== "" ? " active " + state : "";

  return (
    <div
      className={`board__card ${cardActionClass}`}
      id={id.toString()}
      onClick={onClickHandler}
    >
      <img src={image} alt="Card Image" className="board__card-img" />
    </div>
  );
};

export default BoardCard;
