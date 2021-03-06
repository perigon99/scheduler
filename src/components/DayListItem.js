import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  const { name, spots } = props;
  const DayListClass = classnames(
    "day-list__item",
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": props.spots === 0 }
  );

  const formatSpots = (remainingSpots) => {
    if (remainingSpots < 1) {
      return "no spots remaining";
    }
    if (remainingSpots === 1) {
      return "1 spot remaining";
    }
    if (remainingSpots > 1) {
      return `${remainingSpots} spots remaining`;
    }
  };
  return (
    <li
      className={DayListClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2>{name}</h2>
      <h3>{formatSpots(spots)}</h3>
    </li>
  );
}
