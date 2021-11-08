import React, { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

function Formadd(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const onAddtask = () => {
    axios.post("/api/todos/", { input: input }).then(() => {
      console.log("alert");
    });
  };

  const ipref = useRef(null);
  useEffect(() => {
    ipref.current.focus();
  });
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: uuid(),
      text: input,
    });
    setInput("");
  };
  return (
    <form className="do-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Update Task"
            value={input}
            name="task"
            className="task-input"
            onChange={handleChange}
            autoComplete="off"
            ref={ipref}
          />
          <button className="todobtn">Update</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add a Task"
            value={input}
            name="task"
            className="task-input"
            onChange={handleChange}
            autoComplete="off"
            ref={ipref}
          />
          <button className="todobtn" onClick={onAddtask}>
            Add Task
          </button>
        </>
      )}
    </form>
  );
}

export default Formadd;
