import { Dispatch, SetStateAction, useContext, useState } from "react";
import useInput from "../../hooks/useInput";
import { HomeworkCtx } from "../../pages/homework";
import { ITodo } from "../../pages/homework/interfaces";
import Button from "../commons/Button";
import Input from "../commons/Input";
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

  const [isEditingContent, setIsEditingContent] = useState<boolean>(false);
  const {
    value: contentInput,
    onChange: changeContentInput,
    resetValue: resetContentInput,
  } = useInput(todo.content);

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      editTodoContent(todoListId, todoTimeblockId, todo.id, contentInput);
      setIsEditingContent(false);
    }
  };

  return (
    <li className={styles.li}>
      {isEditingContent ? (
        <>
          <input type="checkbox" disabled checked={false} onChange={() => {}} />
          <Input
            value={contentInput}
            onChange={changeContentInput}
            onKeyUp={onKeyUp}
            noBox
          />
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => {
              toggleTodoComplete(todoListId, todoTimeblockId, todo.id);
            }}
          />
          <span>{todo.content}</span>
          <Button
            onClick={() => {
              setIsEditingContent(true);
            }}
          >
            content 수정
          </Button>
          <Button
            onClick={() => {
              deleteTodo(todoListId, todoTimeblockId, todo.id);
            }}
          >
            todo 삭제
          </Button>
        </>
      )}
    </li>
  );
}

/* NOTE
 * 생성하면 수정 상태로 들어가야 한다. 하지만 저장한 이후에는 앱을 로드했을 때든, 언제든, 수정완료 상태로 들어가야 한다. 어떻게 해야?
 */
