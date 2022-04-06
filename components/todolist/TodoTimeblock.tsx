import { useContext, useState } from "react";
import useInput from "../../hooks/useInput";
import useModal from "../../hooks/useModal";
import { HomeworkCtx } from "../../pages/homework";
import { ITodoTimeblock } from "./interfaces";
import Button from "../commons/Button";
import Input from "../commons/Input";
import TextWithButtons from "./TextWithButtons";
import TodoItem from "./TodoItem";
import styles from "./TodoTimeblock.module.css";

interface TodoTimeBlockProps {
  timeblock: ITodoTimeblock;
  todoListId: number;
}

export default function TodoTimeBlock({
  timeblock,
  todoListId,
}: TodoTimeBlockProps) {
  const { eventHandlers } = useContext(HomeworkCtx)!;
  const { deleteTodoTimeblock, editTodoTimeblockTitle, addTodo } =
    eventHandlers;

  const { isModalOpened, openModal, closeModal } = useModal();
  const {
    value: todoContent,
    onChange: changeTodoContent,
    resetValue: resetTodoContent,
  } = useInput("");

  const onAddTodo = () => {
    openModal();
  };
  const onAddTodoKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo(todoListId, timeblock.id, todoContent);
      resetTodoContent();
      closeModal();
    }
  };
  const titleEditFunc = (inputValue: string) => {
    editTodoTimeblockTitle(todoListId, timeblock.id, inputValue);
  };
  const titleDeleteFunc = () => {
    deleteTodoTimeblock(todoListId, timeblock.id);
  };

  const backgroundColor = !timeblock.isWeekly ? "#FFEFEF" : "#D3DEDC";

  return (
    <div className={styles["container"]} style={{ backgroundColor }}>
      <TextWithButtons
        initialInput={timeblock.title}
        editFunc={titleEditFunc}
        deleteFunc={titleDeleteFunc}
        editLabel="블록 제목 수정"
        deleteLabel="블록 삭제"
      />

      <ul className={styles["todos-container"]}>
        {timeblock.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todoTimeblockId={timeblock.id}
            {...{ todo, todoListId }}
          />
        ))}

        {isModalOpened && (
          <li className={styles.li}>
            <input type="checkbox" disabled />
            <Input
              value={todoContent}
              onChange={changeTodoContent}
              onKeyUp={onAddTodoKeyUp}
              noBox
            />
          </li>
        )}
      </ul>

      <Button onClick={onAddTodo} noBox icon="add" />
    </div>
  );
}

/* NOTE: 추가할 기능
 * UnitOfTimeBlock에서 할일이 다 완료되면, 투명도 낮추도록 처리? (필요할까?)
 * weekly, daily에 따라 색깔 분류 뿐 아니라 오른쪽 위 등에 태그도 달기
 * ui를 위해 버튼들 통합... 혹은 오른쪽에 세로로 다 몰기?
 */
