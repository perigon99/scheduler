import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
const {name, spots, selected} = props;
const DayListClass = classnames('day-list__item',{"day-list__item--selected": props.selected},
 {"day-list__item--full": props.spots === 0})
  return (
    <li onClick={() => props.setday(props.name)}>
      <h2 className={DayListClass}>{name}</h2> 
      <h3 className={DayListClass}>{spots} spots remaining</h3>
    </li>
  );
}