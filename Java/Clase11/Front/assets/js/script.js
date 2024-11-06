import { addTask } from "./components/addTasks.js";
import { displayTasks } from "./components/displayTask.js";

const btn = document.querySelector("[data-form-btn]");

btn.addEventListener("click", addTask);

displayTasks();