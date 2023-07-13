import { useSelector } from "react-redux";
import { todosSelector } from "../../store/selectors/todo";
import { Todo } from "../todo";

import styles from "./index.module.css";
import { useState } from "react";

export const TodoList = () => {
  const todos = useSelector(todosSelector);

  const [filterValue, setFilter] = useState("");
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos =
    filterValue === "completed"
      ? todos.filter((todo) => todo.completed === true)
      : filterValue === "complete"
      ? todos.filter((todo) => !todo.completed)
      : todos;

  return (
    <>
      <select onChange={handleFilter}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="complete">Active</option>
      </select>
      <ul className={styles.list}>
        {filteredTodos.map((todo) => {
          if (todo) {
            return <Todo key={todo.id} todo={todo} />;
          }
        })}
      </ul>
    </>
  );
};
