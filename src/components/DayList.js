import React, { useLayoutEffect } from "react";
import DayListItem from "components/DayListItem"

export default function DayList(props){

  const renderListItem = props.days.map((day) => {
    console.log("daylist component",day)
    return <DayListItem 
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  
      />
    })
  

  return(
    <ul>
      {renderListItem}
    </ul>
  )
}