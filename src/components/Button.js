import React from "react";
import classnames from "classnames"
import "components/Button.scss";

export default function Button(props) {
   const {confirm, onClick, danger, disabled} = props

   const buttonClass = classnames('button', {"button--confirm": confirm}, {"button--danger": danger})

   return (
      <button 
         className={buttonClass} 
         onClick={onClick}
         disabled={disabled}
      >
         {props.children}
      </button>);
 }