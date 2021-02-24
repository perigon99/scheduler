
import { useState, useEffect } from "react";
import axios from "axios";
export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

function bookInterview(id, interview) {

  const days = [...state.days]
  //const keyofdays = Object.keys(days)
  if(!state.appointments[id].interview){
    for (let day in days) {
    
        if(days[day].appointments.includes(id)) {
          days[day].spots --
        }
      }
  }
  
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  setState({
    ...state,
    appointments,
    days
  });
  return axios.put(`/api/appointments/${id}`, {interview})  
  
}

function cancelInterview(id) {
  
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  //debugger
  //copy state.days
  const days = [...state.days]
  //const keyofdays = Object.keys(days)
  for (let day in days) {

    if(days[day].appointments.includes(id)) {
      days[day].spots ++
    }
  }
  //debugger
  //loop state.days
  //if day === interviews deleted => day.spot ++
  setState({
    ...state,
    appointments,
    days
  });
  return axios.delete(`/api/appointments/${id}`)  
}

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
 return {state, setState, bookInterview, cancelInterview };
  }