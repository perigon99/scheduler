

export function getAppointmentsForDay(state, day) {

    const getAppointements = []
    state.days.forEach(d => {if(d.name === day) {
      d.appointments.forEach(dapp => {
      getAppointements.push(state.appointments[dapp])
      })
    }})

    return getAppointements;
}