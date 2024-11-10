import { deleteTask } from "../data/deleteTask.js";
import { displayTasks } from "./displayTask.js";


const createDelIcon = (id) => {
    const i = document.createElement("i"); 
    i.classList.add("fas","fa-trash-alt", "trashIcon" ,"icon"); 
    i.addEventListener("click", () => dumpTask(id));
    return i; 
  };
  
  const dumpTask = (id) =>{
    const list = document.querySelector("[data-list]"); 
    deleteTask(id);
    list.innerHTML = "";
    displayTasks(); 
  }

  export default createDelIcon;