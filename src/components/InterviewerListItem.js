import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";



  
export default function InterviewerListItem(props) {
  const listClass = classnames('interviewers__item',{"interviewers__item--selected": props.selected},
 {"interviewers__item-image": (props.avatar && !props.selected)},
 {"interviewers__item--selected-image": (props.avatar && props.selected)})
  return (
    <li 
      className={listClass}
      onClick={props.setInterviewer}>
      <img
        className={listClass}
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {(props.selected) && props.name}
    </li>
  )
}