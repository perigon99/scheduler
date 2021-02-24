import React from "react";
import InterviewerListItem from "./InterviewerListItem"
import PropTypes from 'prop-types';
import "./InterviewerList.scss"

export default function InterviewerList(props) {


  const renderItems = ()  => {

     InterviewerList.propTypes = {
      interviewers: PropTypes.array.isRequired
    };
    return props.interviewers.map((item =>
     
  {   
    return (
     <InterviewerListItem  
        key={item.id}
        name={item.name}
        avatar={item.avatar}
        setInterviewer={() => props.setInterviewer(item.id)}
        selected={props.value === item.id}
       
        
      />)}))
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

