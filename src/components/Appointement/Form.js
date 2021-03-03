import Button from "../Button";
import InterviewerList from "../InterviewerList";
import React, { useState } from "react";

export default function Form(props) {
  const [name, setName] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(
    props.interviewer ? props.interviewer.id : null
  );
  const [error, setError] = useState("");
  const reset = () => {
    setName("");
    setInterviewer(null);
    props.onCancel();
  };
  function validate(event) {
    event.preventDefault();
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    setError("");
    props.onSave(name, interviewer);
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
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          selected={props.interviewer}
          setInterviewer={setInterviewer}
          interviewers={props.interviewers}
          value={interviewer}
          onChange={props.setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>
            Cancel
          </Button>
          <Button confirm onClick={(e) => validate(e)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
