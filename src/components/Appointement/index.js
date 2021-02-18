import React from "react";
import "./styles.scss";
import Header from"./Header";
import Show from"./Show";
import Empty from"./Empty";
import useVisualMode from "../hooks/useVisualMode"
import Form from "./Form";
import {getAppointmentsForDay} from "../helpers/selectors"




export default function Appointment(props) {
  
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const interviewers = props.appForDay
const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);


  return (
    <article className="appointment">
      <Header time="12pm"/>
      {mode === EMPTY && 
      <Empty 
        onAdd={() =>transition("CREATE")}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)}/>
      )}
    </article>
  )
}