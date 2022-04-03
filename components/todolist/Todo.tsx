import { Dispatch, SetStateAction, useState } from "react";
import { ITodo } from "./UnitOfTimeBlock";

interface TodoProps {
  // propContent: string; // NOTE: 추후 삭제 예정. 위에서 받아올 필요가 없다.
  isNewTodo?: boolean;

  todo: ITodo;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

export default function Todo({ isNewTodo = false, todo, setTodos }: TodoProps) {
  const [editValue, setEditValue] = useState<string>(todo.content);
  const [isEditing, setIsEditing] = useState<boolean>(isNewTodo ? true : false);
  const [checked, setChecked] = useState<boolean>(false);

  const completeEdit = () => {
    setTodos((prev) =>
      prev.map((val) => {
        if (val.id === todo.id) {
          val.content = editValue;
        }
        return val;
      })
    );

    setIsEditing(false);
  };
  const startEdit = () => {
    setIsEditing(true);
  };
  const updateInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setTodos((prev) =>
    //   prev.map((val) => {
    //     if (val.id === todo.id) {
    //       val.content = e.target.value;
    //     }
    //     return val;
    //   })
    // );

    setEditValue(e.target.value);
  };
  const deleteTodo = () => {
    setTodos((prev) => prev.filter((val) => todo.id !== val.id));
  };

  const toggleCheck = () => {
    setChecked((prev) => !prev);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input type="text" value={editValue} onChange={updateInputValue} />
          <button onClick={completeEdit}>완료</button>
        </>
      ) : (
        <>
          <input type="checkbox" checked={checked} onChange={toggleCheck} />
          <span>{todo.content}</span>
          <button onClick={startEdit}>수정</button>
          <button onClick={deleteTodo}>삭제</button>
        </>
      )}
    </li>
  );
}

/* NOTE
 * 생성하면 수정 상태로 들어가야 한다. 하지만 저장한 이후에는 앱을 로드했을 때든, 언제든, 수정완료 상태로 들어가야 한다. 어떻게 해야?
 */
