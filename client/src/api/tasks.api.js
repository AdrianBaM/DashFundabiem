import axios from "axios";

const taskAPI = axios.create({
    baseURL: "http://localhost:8000/tasks/api/v1/tasks/",
});

export const getAllTasks = () => taskAPI.get("/");

export const createTask = (task) => taskAPI.post("/", task);