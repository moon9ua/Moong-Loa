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
    <>
      <div className={styles["container"]}>
        <div className={styles["todolists"]}>
          {todolists?.map((todolist) => (
            <TodoList key={todolist.id} {...{ todolist }} />
          ))}
        </div>

        <div className={styles["btn-container"]}>
          <Button
            onClick={() => {
              openModal();
            }}
          >
            todolist 생성
          </Button>
          <Button onClick={() => {}}>숙제 검사표 백업</Button>
        </div>
      </div>

      {isModalOpened && (
        <Modal {...{ closeModal }}>
          <div className={styles["modal-container"]}>
            <h2>리스트 생성</h2>

            <span>
              직업이 될 수도, 숙제의 종류가 될 수도 있습니다.
              <br />
              ex. 배틀마스터 숙제표, 에포나 할 것, 길드의뢰 모음 등등...
            </span>

            <div className={styles["modal-input"]}>
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
    </>
  );
}
