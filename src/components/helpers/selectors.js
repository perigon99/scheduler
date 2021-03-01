export function getAppointmentsForDay(state, day) {
  const getAppointements = [];

  state.days.forEach((d) => {
    if (d.name === day) {
      d.appointments.forEach((dapp) => {
        getAppointements.push(state.appointments[dapp]);
      });
    }
  });
  return getAppointements;
}

export function getInterviewersForDay(state, day) {
  const getInterviewers = [];

  state.days.forEach((d) => {
    if (d.name === day) {
      d.interviewers.forEach((dapp) => {
        getInterviewers.push(state.interviewers[dapp]);
      });
    }
  });
  return getInterviewers;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const student = interview.student;
  const newInterviewObj = {
    student: student,
    interviewer: state.interviewers[`${interview.interviewer}`],
  };

  return newInterviewObj;
}
