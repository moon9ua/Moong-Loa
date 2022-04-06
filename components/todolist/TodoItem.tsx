import { Dispatch, SetStateAction, useContext, useState } from "react";
import useInput from "../../hooks/useInput";
import { HomeworkCtx } from "../../pages/homework";
import { ITodo } from "./interfaces";
import Button from "../commons/Button";
import Input from "../commons/Input";
import TextWithButtons from "./TextWithButtons";
import styles from "./TodoItem.module.css";

interface TodoProps {
  todo: ITodo;
  todoListId: number;
  todoTimeblockId: number;
}

export default function TodoItem({
  todo,
  todoListId,
  todoTimeblockId,
}: TodoProps) {
  const { eventHandlers } = useContext(HomeworkCtx)!;
  const { deleteTodo, editTodoContent, toggleTodoComplete } = eventHandlers;

  const contentEditFunc = (inputValue: string) => {
    editTodoContent(todoListId, todoTimeblockId, todo.id, inputValue);
  };
  const todoDeleteFunc = () => {
    deleteTodo(todoListId, todoTimeblockId, todo.id);
  };

  return (
    <li className={`${styles.li} ${todo.isCompleted && styles.completed}`}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => {
          toggleTodoComplete(todoListId, todoTimeblockId, todo.id);
        }}
      />

      <TextWithButtons
        initialInput={todo.content}
        editFunc={contentEditFunc}
        deleteFunc={todoDeleteFunc}
        editLabel="To-do 내용 수정"
        deleteLabel="To-do 삭제"
      />
    </li>
  );
}

/* NOTE
 * 생성하면 수정 상태로 들어가야 한다. 하지만 저장한 이후에는 앱을 로드했을 때든, 언제든, 수정완료 상태로 들어가야 한다. 어떻게 해야?
 */
