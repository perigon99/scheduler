import React from "react";
import DayList from "components/DayList"
import { useState, useEffect } from "react";
import "components/Application.scss";
import Appointment from "components/Appointement/index.js";
import axios from "axios";
import {getAppointmentsForDay, getInterviewersForDay} from "components/helpers/selectors"

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  
  const setDay = function(d) {setState(prev =>({ ...prev, day:d }))};
  const setDays = function(d) {setState(prev =>({ ...prev, days:d }))};
  const setAppointments = function(app)  {setState(prev =>({ ...prev, appointments:app }))};
  const setInterviewers = interviewers => setState(prev => ({ ...prev, interviewers }));




  useEffect(() => {

let URL1 = "/api/days"
let URL2 = "/api/appointments"
let URL3 = "/api/interviewers"

const promise1 =axios.get(URL1)
const promise2 =axios.get(URL2)
const promise3 =axios.get(URL3)

    Promise.all([promise1, promise2, promise3])
    .then((response) => {
      setState(state => ({
        ...state, days:response[0].data, appointments:response[1].data, interviewers:response[2].data
      }))
    })
  }, [])   
  

const dailyAppointments = getAppointmentsForDay(state, state.day)
const appointement = dailyAppointments.map((app) => {
  console.log("daily appointement", dailyAppointments)
   console.log("app section",app)
   return (<Appointment
      key={app.id}
      id={app.id}
     time={app.time}
     interview={app.interview}
     interviewers={getInterviewersForDay(state, state.day)}
   />
 )}
)


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
  
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
