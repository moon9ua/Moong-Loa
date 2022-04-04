import { Dispatch, SetStateAction, useContext, useState } from "react";
import useInput from "../../hooks/useInput";
import { HomeworkCtx } from "../../pages/homework";
import { ITodo } from "../../pages/homework/interfaces";

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

  return (
    <li>
      {isEditingContent ? (
        <>
          <input value={contentInput} onChange={changeContentInput} />
          <button
            onClick={() => {
              editTodoContent(
                todoListId,
                todoTimeblockId,
                todo.id,
                contentInput
              );
              setIsEditingContent(false);
            }}
          >
            완료
          </button>
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
          <button
            onClick={() => {
              setIsEditingContent(true);
            }}
          >
            content 수정
          </button>
          <button
            onClick={() => {
              deleteTodo(todoListId, todoTimeblockId, todo.id);
            }}
          >
            todo 삭제
          </button>
        </>
      )}
    </li>
  );
}

/* NOTE
 * 생성하면 수정 상태로 들어가야 한다. 하지만 저장한 이후에는 앱을 로드했을 때든, 언제든, 수정완료 상태로 들어가야 한다. 어떻게 해야?
 */
