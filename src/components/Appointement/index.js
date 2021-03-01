import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const STATUS = "STATUS";
  const ERROR_SAVE = "ERROR_SAVE";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    if (interview.interviewer) {
      transition(STATUS);

      props
        .bookInterview(props.id, interview)
        .then(() => transition("SHOW"))
        .catch((error) => transition(CREATE, true));
    } else {
      alert("Error no interviwer selected");
    }
  }

  function cancel() {
    transition(STATUS);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(SHOW, true));
  }

  function edit(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(STATUS);
    props
      .bookInterview(props.id, interview)
      .then(() => transition("SHOW"))
      .catch((error) => transition(ERROR_SAVE, true));
  }
  function destroy(event) {
    transition(CONFIRM, true);
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => destroy()}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CONFIRM && (
        <Confirm onConfirm={() => cancel()} onCancel={() => back()} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          setInterviewers={props.setInterviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewer={props.interview.interviewer}
          student={props.interview.student}
          interviewers={props.interviewers}
          setInterviewers={props.setInterviewers}
          onSave={edit}
          onCancel={() => back(EMPTY)}
        />
      )}
      {mode === STATUS && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === ERROR_SAVE && (
        <Error message={props.error} onCancel={() => back()} />
      )}
    </article>
  );
}
