import React, { useEffect, useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    // Fetch tasks from localStorage on initial load
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : ["Darwinbox", "Standup"];
  });
  
  const [newTask, setNewTask] = useState("");
  

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));

  }, [tasks]);

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    console.log("Deleted task", tasks[index]);
    // setDeletedTasks([...deletedTasks,tasks[index]])
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }
  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <button className="delete-button" onClick={() => deleteTask(index)}>
              Delete
            </button>
            <button className="move-button" onClick={() => moveTaskUp(index)}>
              👆
            </button>
            <button className="move-button" onClick={() => moveTaskDown(index)}>
              👇
            </button>
          </li>
        ))}
      </ol>
    
      
    </div>
  );
}

export default ToDoList;
