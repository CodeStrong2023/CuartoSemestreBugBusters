import { path } from "./path.js";

export const getTasks = async () => {
    const response = await fetch(path+"all");
    const tasks = await response.json();

    return tasks;
};