import React from "react";
import DayList from "components/DayList"
import { useState, useEffect } from "react";
import "components/Application.scss";
import Appointment from "components/Appointement/index.js";
import axios from "axios";
import {getAppointmentsForDay} from "components/helpers/selectors"

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState(prev =>({ ...prev, day }));
  const setDays = days => setState(prev =>({ ...prev, days }));
  const setAppointments = appointments => setState(prev =>({ ...prev, appointments }));
  const setInterviewers = interviewers => setState(prev => ({ ...prev, interviewers }));

let URL1 = "/api/days"
let URL2 = "/api/appointments"
let URL3 = "/api/interviewers"

const promise1 =axios.get(URL1)
const promise2 =axios.get(URL2)
const promise3 =axios.get(URL3)
  useEffect(() => {
    Promise.all([promise1, promise2, promise3])
    .then((response) => {
      setDays(response[0].data)
      setAppointments(response[1].data)
      setInterviewers(response[2].data)
    }) 
  }, [])   
  

const dailyAppointments = getAppointmentsForDay(state, state.day)


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
      
     {dailyAppointments.map((appointement) => {
    console.log(appointement)
    return <Appointment
      //key={appointement.id} 
      {...appointement}     
      />})}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
