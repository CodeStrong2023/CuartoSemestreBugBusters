import { checkTask } from "../data/checkTask.js";

const checkComplete = (id,finished) => {

    const i = document.createElement("i"); 
    i.classList.add("far", "fa-check-square", "icon");
    if(finished){
      i.classList.toggle("fas");
      i.classList.toggle("completeIcon");
      i.classList.toggle("far"); 
    }
    i.addEventListener("click", (event) => completeTask(event, id,finished));
    return i; 
  };
  
  const completeTask = (event, id,finished) =>{
    const element = event.target;
    element.classList.toggle("fas");
    element.classList.toggle("completeIcon");
    element.classList.toggle("far"); 
    
    finished = !finished; 
    checkTask(id, finished);
  }

  export default checkComplete;