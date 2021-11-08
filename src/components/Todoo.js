import React, { useState } from "react";
import Formadd from "./Formadd";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function ToDoo({ tasks, completeTodo, removeTodo, updateTask }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const updatechange = (value) => {
    updateTask(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <Formadd edit={edit} onSubmit={updatechange} />;
  }
  return tasks.map((task, idx) => (
    <div className={task.isComplete ? "row complete" : "row"} key={idx}>
      <div key={task.id} onClick={() => completeTodo(task.id)}>
        {task.text}
      </div>
      <div className="icns">
        <RiCloseCircleLine
          onClick={() => removeTodo(task.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: task.id, value: task.text })}
          className="edit-icon"
        />
      </div>
    </div>
  ));
}

export default ToDoo;
