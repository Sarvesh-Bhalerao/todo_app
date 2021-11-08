import React, { useState } from "react";
import Formadd from "./Formadd";
import ToDoo from "./Todoo";
import axios from "axios";

function List() {
  const [tasks, settodo] = useState([]);

  const refreshList = () => {
    axios
      .get("/api/todos/")
      .then((res) => this.setState({ tasks: res.data }))
      .catch((err) => console.log(err));
  };
  refreshList();

  const addtasks = (task) => {
    if (!task.text || /^\s*$/.test(task.text)) {
      return;
    }

    const newTasks = [task, ...tasks];
    settodo(newTasks);
    // console.log(newTasks);
  };

  const updateTask = (taskId, updvalue) => {
    if (!updvalue.text || /^\s*$/.test(updvalue.text)) {
      return;
    }

    settodo((prev) => prev.map((it) => (it.id === taskId ? updvalue : it)));
  };

  const removeTodo = (id) => {
    const removarr = [...tasks].filter((task) => task.id !== id);
    settodo(removarr);
  };

  const completeTodo = (id) => {
    let updated = tasks.map((task) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    settodo(updated);
  };

  return (
    <div>
      <h1>Add Your Plans....</h1>
      <Formadd onSubmit={addtasks} />
      <ToDoo
        tasks={tasks}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTask={updateTask}
      />
    </div>
  );
}

export default List;
