import React from "react";

function TaskList({ tasks, onToggle, onDelete }) {
  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li
          key={task.id || index}
          className={`task-item ${task.done ? "done" : ""}`}
          data-id={task.id || index}
        >
          <input
            type="checkbox"
            className="task-checkbox"
            checked={task.done}
            onChange={() => onToggle(task.id || index)}
          />
          <div className="task-content">
            <span className="task-text">{task.text}</span>
            <div className="task-meta">
              {task.createdAt && (
                <span className="task-date">{formatDate(task.createdAt)}</span>
              )}
              <span
                className={`task-priority priority-${
                  task.priority || "medium"
                }`}
              >
                {task.priority || "Medium"}
              </span>
            </div>
          </div>
          <div className="task-actions">
            <button
              className="task-btn delete-btn"
              onClick={() => onDelete(task.id || index)}
              aria-label="Delete task"
            >
              ×
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
