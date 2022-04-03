import Button from "../../components/commons/Button";
import TodoListBlock from "../../components/todolist/TodoListBlock";
import styles from "./index.module.css";

export default function TodoList() {
  return (
    <div>
      <Button label="Todolist 추가" />

      <div className={styles["todo-container"]}>
        <TodoListBlock />
        <TodoListBlock />
        <TodoListBlock />
      </div>
    </div>
  );
}
