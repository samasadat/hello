import { createTaskCard } from "./task.js";

document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem(
    "API_URL",
    "https://67ee271bc11d5ff4bf7883f7.mockapi.io/tasks"
  );

  init();
});

async function addNewTaskListener() {
  document
    .getElementById("task-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const newTask = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value,
        dueDate: document.getElementById("dueDate").value
          ? Math.floor(
              new Date(document.getElementById("dueDate").value).getTime() /
                1000
            )
          : null,
        createdAt: Math.floor(Date.now() / 1000),
        category: [],
        name: "samasadat",
        avatar: "avatar " + Math.floor(Math.random() * 5 + 1),
      };
      let response = await addTask(localStorage.getItem("API_URL"), newTask);
      document.getElementById("task-modal").classList.add("hidden");
      await fetchAndListTasks();
      this.reset();
    });
}

async function fetchAndListTasks() {
  const tasks = await getTasks();
  localStorage.setItem("tasks", JSON.stringify(tasks));
  listTasks();
}

async function getTasks() {
  const API_URL = localStorage.getItem("API_URL");
  const response = await fetch(API_URL, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
  if (!response.ok) {
    console.log(`Fetch tasks failed! status: ${response.status}`);
  }
  return await response.json();
}

async function addTask(API_URL, task) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    console.log(`Add new task failed! status: ${response.status}`);
  }
  return await response.json();
}

async function init() {
  document.getElementById("add-task").addEventListener("click", () => {
    document.getElementById("task-modal").classList.remove("hidden");
  });
  document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("task-modal").classList.add("hidden");
  });
  document.getElementById("task-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("task-modal")) {
      document.getElementById("task-modal").classList.add("hidden");
    }
  });
  addNewTaskListener();
  localStorage.setItem("filter", "all");
  await fetchAndListTasks();
  document
    .getElementById("filter-all")
    .addEventListener("click", () => changeFilter("all"));
  document
    .getElementById("filter-high")
    .addEventListener("click", () => changeFilter("high"));
  document
    .getElementById("filter-low")
    .addEventListener("click", () => changeFilter("low"));
  document
    .getElementById("filter-medium")
    .addEventListener("click", () => changeFilter("medium"));
}

async function deleteTaskEvent(e) {
  const task_id = parseInt(e.target.closest("button").dataset.id);
  let response = await deleteTask(task_id);
  await fetchAndListTasks();
}
async function statusTaskEvent(e) {
  const task_id = parseInt(e.target.closest("button").dataset.id);
  const task_status = e.target.closest("button").dataset.status;
  let response = await setTaskStatus(task_id, task_status);
  await fetchAndListTasks();
}
async function deleteTask(task_id) {
  const response = await fetch(
    `${localStorage.getItem("API_URL")}/${task_id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    console.log(`Delete task failed! status: ${response.status}`);
  }
  return await response.json();
}
async function setTaskStatus(task_id, task_status) {
  const response = await fetch(
    `${localStorage.getItem("API_URL")}/${task_id}`,
    {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: task_status }),
    }
  );
  if (!response.ok) {
    console.log(`Set task status failed! status: ${response.status}`);
  }
  return await response.json();
}

function changeFilter(filter) {
  const filter_all = document.getElementById("filter-all");
  const filter_high = document.getElementById("filter-high");
  const filter_low = document.getElementById("filter-low");
  const filter_medium = document.getElementById("filter-medium");
  [filter_all, filter_high, filter_low, filter_medium].forEach((btn) => {
    btn.classList.remove("bg-blue-600", "text-white", "hover:bg-blue-700");
    btn.classList.add("bg-gray-200", "text-gray-700", "hover:bg-gray-400");
  });
  let filter_tag =
    filter === "all"
      ? filter_all
      : filter === "high"
      ? filter_high
      : filter == "medium"
      ? filter_medium
      : filter_low;

  filter_tag.classList.add("bg-blue-600", "text-white", "hover:bg-blue-700");
  filter_tag.classList.remove(
    "bg-gray-200",
    "text-gray-700",
    "hover:bg-gray-400"
  );
  localStorage.setItem("filter", filter);
  listTasks();
}

function listTasks() {
  const tasks_div = document.getElementById("tasks");
  tasks_div.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  const filter = localStorage.getItem("filter") || "all";
  tasks = tasks.filter((task) =>
    filter === "all" ? true : task.priority.toLowerCase() === filter
  );
  setTaskCount(tasks.length);
  tasks.forEach((task) => {
    tasks_div.appendChild(createTaskCard(task));
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", deleteTaskEvent);
    });
    document.querySelectorAll(".status-btn").forEach((btn) => {
      btn.addEventListener("click", statusTaskEvent);
    });
  });
}

function setTaskCount(count) {
  const count_tag = document.getElementById("task-count");
  count_tag.innerText = count;
}
