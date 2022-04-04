import { useContext, useState } from "react";
import useInput from "../../hooks/useInput";
import useModal from "../../hooks/useModal";
import { HomeworkCtx } from "../../pages/homework";
import { ITodo, ITodoTimeblock } from "../../pages/homework/interfaces";
import Modal from "../commons/Modal";
import TodoItem from "./TodoItem";

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

  const { value: timeblockTitle, onChange: changeTimeblockTitle } = useInput(
    timeblock.title
  );
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);

  const { isModalOpened, openModal, closeModal } = useModal();
  const {
    value: todoContent,
    onChange: changeTodoContent,
    resetValue: resetTodoContent,
  } = useInput("");

  const backgroundColor = !timeblock.isWeekly ? "yellow" : "skyblue";

  return (
    <div style={{ backgroundColor }}>
      {isEditingTitle ? (
        <>
          <input value={timeblockTitle} onChange={changeTimeblockTitle} />
          <button
            onClick={() => {
              editTodoTimeblockTitle(todoListId, timeblock.id, timeblockTitle);
              setIsEditingTitle(false);
            }}
          >
            수정 완료
          </button>
        </>
      ) : (
        <>
          <span>{timeblock.title}</span>
          <button
            onClick={() => {
              setIsEditingTitle(true);
            }}
          >
            제목 수정
          </button>
        </>
      )}

      <ul>
        {timeblock.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todoTimeblockId={timeblock.id}
            {...{ todo, todoListId }}
          />
        ))}

        {isModalOpened && (
          <li>
            <input value={todoContent} onChange={changeTodoContent} />
            <button
              onClick={() => {
                addTodo(todoListId, timeblock.id, todoContent);
                resetTodoContent();
                closeModal();
              }}
            >
              생성
            </button>
          </li>
        )}
      </ul>

      <button
        onClick={() => {
          deleteTodoTimeblock(todoListId, timeblock.id);
        }}
      >
        timeblock 삭제
      </button>

      <button
        onClick={() => {
          openModal();
        }}
      >
        todo 추가
      </button>
    </div>
  );
}

/* NOTE: 추가할 기능
 * UnitOfTimeBlock에서 할일이 다 완료되면, 투명도 낮추도록 처리? (필요할까?)
 * weekly, daily에 따라 색깔 분류 뿐 아니라 오른쪽 위 등에 태그도 달기
 * ui를 위해 버튼들 통합... 혹은 오른쪽에 세로로 다 몰기?
 */
