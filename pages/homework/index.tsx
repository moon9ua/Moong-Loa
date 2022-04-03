import { useState } from "react";
import Button from "../../components/commons/Button";
import ModalWithButton from "../../components/commons/ModalWithButton";
import TodoList from "../../components/todolist/TodoList";
import TodoTimeBlock from "../../components/todolist/TodoTimeblock";
import styles from "./index.module.css";

export default function Homework() {
  const [todolists, setTodolists] = useState<ITodolist[]>([]);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const addTodolist = () => {};
  const deleteTodolist = () => {};
  const editTodolistTitle = () => {};

  // const addTodoTimeblock = () => {};
  // const deleteTodoTimeblock = () => {};
  // const editTodoTimeblockTitle = () => {};

  // const addTodo = () => {};
  // const deleteTodo = () => {};
  // const editTodo = () => {};
  // const toggleTodoComplete = () => {};

  return (
    <div>
      <ModalWithButton btnName="test">
        <>
          <span>test</span>
          <input />
          <button>testbtn</button>
        </>
      </ModalWithButton>

      <Button label="Todolist 추가" />

      <div className={styles["todo-container"]}>
        <TodoList />
        <TodoList />
        <TodoList />
      </div>
    </div>
  );
}

export interface ITodolist {
  id: number;
  title: string;
  todoTimeblocks: ITodoTimeblock[];
}

export function NewTodolist(newTodoTitle: string): ITodolist {
  return {
    id: +new Date(),
    title: newTodoTitle,
    todoTimeblocks: [],
  };
}

export interface ITodoTimeblock {
  id: number;
  title: string;
  isWeekly: boolean;
  todos: ITodo[];
}

export interface ITodo {
  id: number;
  content: string;
  isCompleted: boolean;
}

/* NOTE:
 * button 간단하게 변경 (아이콘 등으로) + hover시 안내 popup

 * 상태 옮기기: 전체 상태에 대한 구조 설계 필요
 * todolists: Itodolist[]
 * Itodolist: { id: number, isWeekly: boolean, todos: Itodo[] }
 * Itodo: { id: number, content: string }
 */
