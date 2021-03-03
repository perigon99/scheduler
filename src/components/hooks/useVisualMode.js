import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  console.log(history);
  const transition = (next, replace = false) => {
    setHistory((prev) =>
      replace ? [...prev.slice(0, history.length - 1), next] : [...prev, next]
    );
  };
  const back = () => {
    console.log(history);
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, history.length - 1)]);
    } else {
      setHistory(["SHOW"]);
      //setHistory(["SHOW"]);
    }
  };
  return { mode: history[history.length - 1], transition, back };
}
