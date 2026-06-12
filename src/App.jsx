import { useState } from "react";
import { useEffect } from "react";

function Todo(){
  const [task,setTask] = useState("");
  const [tasks,setTasks] = useState(()=>{
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editIndex,setEditIndex] = useState(null);
  const [editText,setEditIext] = useState("");
  const [filter,setFilter] = useState("all");

  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
  },[tasks]);

  const filteredTask = tasks.filter(task=>{
    if(filter === "completed")
      return task.completed;

    if(filter === "pending")
      return !task.completed;

    return true;
  });
  
  function addTask(){
    if(task.trim() === "") return;
    setTasks([
      ...tasks,
      {
        text:task,
        completed:false
      },
    ]);
    setTask("");
  }

  function deleteTask(indexToDelete){
    const updateTasks = tasks.filter((_,index) => index !== indexToDelete);

    setTasks(updateTasks);
  }

  function taskComplited(index) {
    const updateTasks = tasks.map((task, i) =>
      i === index
        ? {
            ...task,
            completed: !task.completed,
          }
        : task
    );
    setTasks(updateTasks);
  }

  function saveEdit(){
    const updateTasks = tasks.map((task,index)=>
      index === editIndex ? {...task, text : editText}
      :task
    );
    setTasks(updateTasks);
    setEditIndex(null);
  }
  return (
  <div className="container mt-5">
    <h1 className="text-center mb-4">
      Todo App
    </h1>

    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Enter Task"
        value={task}
        onChange={(e) =>
          setTask(e.target.value)
        }
      />

      <button
        className="btn btn-primary"
        onClick={addTask}
      >
        Add
      </button>
    </div>

    <h5>
      Total Tasks: {tasks.length}
    </h5>

    <div className="mb-3">
      <button 
      className="btn btn-secondary me-2"
      onClick={()=>setFilter("All")}
      >
        All
      </button>

      <button
      className="btn btn-success me-2"
      onClick={()=>setFilter("completed")}
      >
        Completed
      </button>

      <button
      className="btn btn-warning"
      onClick={()=>setFilter("pending")}
      >
        Pending
      </button>

    </div>

    {filteredTask.map((item, index) => (
      <div
        key={index}
        className="d-flex justify-content-between align-items-center border p-2 mb-2 rounded"
      >
        {editIndex === index ? (
          <input
          type="text"
          value={editText}
          onChange={(e)=>setEditIext(e.target.value)}
          className="form-control"
          />
        ):(
          <span
            style={{
              textDecoration: item.completed
                ? "line-through"
                : "none",
              color: item.completed
                ? "green"
                : "black",
            }}      
          >{item.text}</span>
        )}
        <div className="d-flex gap-2">
          <button
            className="btn btn-success me-2"
            onClick={() =>
              taskComplited(index)
            }
          >
            {item.completed ? "Undo" : "✓"}
          </button>

          {editIndex === index ? (
            <button   
            className = "btn btn-primary me-2"
            onClick={saveEdit}
            > Save </button>
          ):(
            <button
            className="btn btn-warning me-2"
            onClick={()=>{
              setEditIndex(index);
              setEditIext(item.text)
            }}
            >Edit</button>
          )}
          <button
            className="btn btn-danger"
            onClick={() =>
              deleteTask(index)
            }
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);
}

export default Todo;