import checkComplete from "./checkComplete.js";
import createDelIcon from "./deleteIco.js";
import { displayTasks } from "./displayTask.js";
import { sendTask } from "../data/sendTask.js";

export const addTask = (event) => {
  event.preventDefault(); //evita que se recargue la pagina borrando la información

  const list = document.querySelector("[data-list]"); 
  const input = document.querySelector("[data-form-input]"); 
  const calendar = document.querySelector("[data-form-date]"); 

  const title = input.value; 
  const date = calendar.value; 
  const dateFormat = moment(date).format("yyyy-MM-DD");
  const time = moment(date).format("HH:mm");

  if (input == "" || date == "") {
    return;
  }

  input.value = ""; 
  calendar.value = ""; 

  const finished = false; 

  const taskObj = {
    
    title, 
    date:dateFormat, 
    time, 
    finished, 
  };

  list.innerHTML = ""; 
  
  sendTask(taskObj); 
  displayTasks(); 
};


export const createTask = ({ id, title, time, finished }) => {
  
  const task = document.createElement("li"); 
  task.classList.add("card"); 

  
  const taskContent = document.createElement("div"); 

  const check = checkComplete(id, finished);

  const titleTask = document.createElement("span"); 
  titleTask.classList.add("task"); 
  titleTask.innerText = title; 
  taskContent.appendChild(check); 
  taskContent.appendChild(titleTask); 

  const dateElement = document.createElement("span"); 
  dateElement.innerHTML = time; 
  task.appendChild(taskContent); 
  task.appendChild(dateElement); 
  task.appendChild(createDelIcon(id)); 
  return task;
};