import Button from "../Button"
import InterviewerList from "../InterviewerList"
import React, { useState } from 'react'

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    setName("")
    setInterviewer(null)
    props.onCancel()
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event => setName(event.target.value))} 
          />
        </form>
        <InterviewerList setInterviewer={setInterviewer} interviewers={props.interviewers} value={props.interviewer} onChange={props.setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}