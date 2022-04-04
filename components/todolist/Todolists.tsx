import { useContext, useState } from "react";
import useInput from "../../hooks/useInput";
import useModal from "../../hooks/useModal";
import { HomeworkCtx } from "../../pages/homework";
import Button from "../commons/Button";
import Input from "../commons/Input";
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
      <Button
        onClick={() => {
          openModal();
        }}
      >
        todolist 생성
      </Button>

      {isModalOpened && (
        <Modal {...{ closeModal }}>
          <div className={styles["modal-container"]}>
            <div>
              <h3>숙제표 생성</h3>

              <span>
                직업이 될 수도, 숙제의 종류가 될 수도 있습니다.
                <br />
              </span>
              <span>
                ex. 배틀마스터 숙제표, 에포나 할 것, 길드의뢰 모음 등등...
                <br />
              </span>
            </div>

            <br />

            <div>
              <Input value={todolistTitle} onChange={changeTodolistTitle} />
              <Button
                onClick={() => {
                  addTodolist(todolistTitle);
                  resetTodolistTitle();
                  closeModal();
                }}
              >
                생성
              </Button>
            </div>
          </div>
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
