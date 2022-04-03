import { useState } from "react";
import { ITodo } from "../../pages/homework";
import TodoItem from "./TodoItem";

interface TodoTimeBlockProps {
  weekly?: boolean;
  propTitle?: string;
}

export default function TodoTimeBlock({
  weekly = false,
  propTitle,
}: TodoTimeBlockProps) {
  const backgroundColor = !weekly ? "yellow" : "skyblue";
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [title, setTitle] = useState(propTitle ?? ""); // NOTE: 맞나?

  const addTodo = () => {
    const tmpTodo = "임시 할일";
    // setTodos((prev) => [...prev, { id: +new Date(), content: tmpTodo }]);
  };

  const modifyTitle = () => {
    const tmpTitle = "임시 타이틀";
    setTitle(tmpTitle);
  };

  return (
    <div style={{ backgroundColor }}>
      {title && <span>{title}</span>}

      <button onClick={modifyTitle}>제목 설정</button>

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            // propContent={todo.content}
            // id={todo.id}
            {...{ todo, setTodos }}
          />
        ))}
      </ul>

      <button onClick={addTodo}>추가</button>
    </div>
  );
}

/* NOTE: 추가할 기능
 * UnitOfTimeBlock에서 할일이 다 완료되면, 투명도 낮추도록 처리? (필요할까?)
 * weekly, daily에 따라 색깔 분류 뿐 아니라 오른쪽 위 등에 태그도 달기
 * ui를 위해 버튼들 통합... 혹은 오른쪽에 세로로 다 몰기?
 */