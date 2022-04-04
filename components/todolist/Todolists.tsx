import { useContext, useState } from "react";
import useInput from "../../hooks/useInput";
import useModal from "../../hooks/useModal";
import { HomeworkCtx } from "../../pages/homework";
import Modal from "../commons/Modal";
import TodoList from "./TodoList";
import styles from "./Todolists.module.css";

export default function Todolists() {
  const { todolists, eventHandlers } = useContext(HomeworkCtx)!; // NOTE: null에 대한 처리를 어떻게 해야할까?
  const { addTodolist } = eventHandlers;

  const {
    value: todolistTitle,
    onChange: changeTodolistTitle,
    resetValue: resetTodolistTitle,
  } = useInput("");
  const { isModalOpened, openModal, closeModal } = useModal();

  return (
    <div>
      <button
        onClick={() => {
          openModal();
        }}
      >
        todolist 생성
      </button>

      {isModalOpened && (
        <Modal {...{ closeModal }}>
          <>
            <input value={todolistTitle} onChange={changeTodolistTitle} />
            <button
              onClick={() => {
                addTodolist(todolistTitle);
                resetTodolistTitle();
                closeModal();
              }}
            >
              생성
            </button>
          </>
        </Modal>
      )}

      <div className={styles["todo-container"]}>
        {todolists?.map((todolist) => (
          <TodoList key={todolist.id} {...{ todolist }} />
        ))}
      </div>
    </div>
  );
}
