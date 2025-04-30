import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../styles/Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    remaining: 0,
  });

  useEffect(() => {
    // Simulate loading for smooth transition
    setTimeout(() => {
      const saved = JSON.parse(localStorage.getItem("tasks")) || [];
      setTasks(saved);
      setIsLoaded(true);
    }, 300);
  }, []);

  useEffect(() => {
    // Update stats when tasks change
    const completed = tasks.filter((task) => task.done).length;
    setStats({
      total: tasks.length,
      completed: completed,
      remaining: tasks.length - completed,
    });
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      done: false,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    // Add animation class to the latest task
    setTimeout(() => {
      const taskItems = document.querySelectorAll(".task-item");
      if (taskItems.length > 0) {
        taskItems[taskItems.length - 1].classList.add("task-added");
      }
    }, 10);
  };

  const toggleTask = (id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    // Add toggle animation
    const taskItem = document.querySelector(`.task-item[data-id="${id}"]`);
    if (taskItem) {
      taskItem.classList.add("task-updated");
      setTimeout(() => {
        taskItem.classList.remove("task-updated");
      }, 500);
    }
  };

  const deleteTask = (id) => {
    // Add delete animation
    const taskItem = document.querySelector(`.task-item[data-id="${id}"]`);
    if (taskItem) {
      taskItem.classList.add("task-removed");

      // Wait for animation to complete before removing from state
      setTimeout(() => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
      }, 300);
    } else {
      // If no animation, just remove
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    }
  };

  const clearCompleted = () => {
    const completedTasks = tasks.filter((task) => task.done);

    // Add animation to all completed tasks
    completedTasks.forEach((task) => {
      const taskItem = document.querySelector(
        `.task-item[data-id="${task.id}"]`
      );
      if (taskItem) {
        taskItem.classList.add("task-removed");
      }
    });

    // Wait for animation before updating state
    setTimeout(() => {
      const newTasks = tasks.filter((task) => !task.done);
      setTasks(newTasks);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    }, 300);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true; // "all" filter
  });

  return (
    <div className={`dashboard-container ${isLoaded ? "loaded" : ""}`}>
      <div className="dashboard-header">
        <h1>My Tasks</h1>
        <div className="task-stats">
          <div className="stat-item">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.remaining}</span>
            <span className="stat-label">Remaining</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <TaskForm onAdd={addTask} />

        <div className="task-filter">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          {stats.completed > 0 && (
            <button className="clear-btn" onClick={clearCompleted}>
              Clear Completed
            </button>
          )}
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />

        {filteredTasks.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p>
              {filter === "all"
                ? "You have no tasks yet. Add one above!"
                : filter === "active"
                ? "No active tasks remaining. Great job!"
                : "No completed tasks yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
