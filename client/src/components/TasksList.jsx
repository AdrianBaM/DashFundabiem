import { useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";

export function TasksList({ tasks }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
