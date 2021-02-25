import React from "react";
import Button from "../Button";

export default function Confirm(props) {
  const reset = () => {
    props.onCancel();
  };
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">
        Are you sure you would like to delete?
      </h1>
      <section className="appointment__actions">
        <Button danger onClick={reset}>
          Cancel
        </Button>
        <Button danger onClick={props.onConfirm}>
          Confirm
        </Button>
      </section>
    </main>
  );
}
