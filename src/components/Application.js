import React from "react";
import DayList from "components/DayList"
import { useState, useEffect } from "react";
import "components/Application.scss";
import Appointment from "components/Appointement/index.js";

import useApplicationData from "./hooks/useApplicationData";
import {getAppointmentsForDay, getInterviewersForDay, getInterview} from "components/helpers/selectors"

export default function Application(props) {
  const {state, setState,bookInterview, cancelInterview } = useApplicationData();

  
  
   const setDay = function(d) {setState(prev =>({ ...prev, day:d }))};


  

const dailyAppointments = getAppointmentsForDay(state, state.day)
const appointement = dailyAppointments.map((app) => {
const interview = getInterview(state, app.interview)
   return (<Appointment
      key={app.id}
      id={app.id}
     time={app.time}
     interview={interview}
     interviewers={getInterviewersForDay(state, state.day)}
     bookInterview={bookInterview} 
     cancelInterview={cancelInterview}
   />
 )}
)

// function bookInterview(id, interview) {

//   const appointment = {
//     ...state.appointments[id],
//     interview: { ...interview }
//   };
//   const appointments = {
//     ...state.appointments,
//     [id]: appointment
//   };
//   setState({
//     ...state,
//     appointments
//   });
//   return axios.put(`/api/appointments/${id}`, {interview})  
//   .catch()
// }

// function cancelInterview(id) {
  
//   const appointment = {
//     ...state.appointments[id],
//     interview: null
//   };
//   const appointments = {
//     ...state.appointments,
//     [id]: appointment
//   };
//   setState({
//     ...state,
//     appointments
//   });
//   return axios.delete(`/api/appointments/${id}`)  
// }

  return (
    <main className="layout">
      <section className="sidebar">
    
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">

<DayList
  days={state.days}
  day= {state.day}
  setDay={setDay}
/>

</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {appointement}
  
        <Appointment key="last" time="5pm" bookInterview={bookInterview} cancelInterview={cancelInterview} />
      </section>
    </main>
  );
}
