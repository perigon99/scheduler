import React from "react";
import classnames from "classnames";
import InterviewerListItem from "./InterviewerListItem"
import "./InterviewerList.scss"

export default function InterviewerList(props) {


  const renderItems = ()  => {
    return props.interviewers.map((item =>
     (<InterviewerListItem  
        key={item.id}
        name={item.name}
        avatar={item.avatar}
        setInterviewer={() => props.setInterviewer(item)}
        selected={props.interviewer === item.id}
      />)))
    }
   
return(
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
    {renderItems()}
    </ul>
  </section>
)
}

