import React, { useState } from "react";

function TaskForm({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Task cannot be empty");
      return;
    }

    onAdd({
      text: text.trim(),
      priority,
      done: false,
    });

    setText("");
    setError("");

    // Animation for form submission feedback
    const formElement = document.querySelector(".task-form");
    formElement.classList.add("form-submitted");
    setTimeout(() => {
      formElement.classList.remove("form-submitted");
    }, 500);
  };

  return (
    <>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setError("")}
        />
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add</button>
      </form>
      {error && <div className="error">{error}</div>}
    </>
  );
}

export default TaskForm;
