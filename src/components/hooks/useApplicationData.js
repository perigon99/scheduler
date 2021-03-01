import { useState, useEffect } from "react";
import axios from "axios";
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = [...state.days];
    if (!state.appointments[id].interview) {
      for (let day in days) {
        if (days[day].appointments.includes(id)) {
          days[day].spots--;
        }
      }
    }

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = [...state.days];
    for (let day in days) {
      if (days[day].appointments.includes(id)) {
        days[day].spots++;
      }
    }
    setState({
      ...state,
      appointments,
      days,
    });
    return axios.delete(`/api/appointments/${id}`);
  }

  useEffect(() => {
    let URL1 = "/api/days";
    let URL2 = "/api/appointments";
    let URL3 = "/api/interviewers";

    const promise1 = axios.get(URL1);
    const promise2 = axios.get(URL2);
    const promise3 = axios.get(URL3);

    Promise.all([promise1, promise2, promise3]).then((response) => {
      setState((state) => ({
        ...state,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }));
    });
  }, []);
  return { state, setState, bookInterview, cancelInterview };
}
