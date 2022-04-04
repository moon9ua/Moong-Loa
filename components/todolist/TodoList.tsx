import { useContext, useState } from "react";
import useInput from "../../hooks/useInput";
import useModal from "../../hooks/useModal";
import { HomeworkCtx } from "../../pages/homework";
import { ITodolist } from "../../pages/homework/interfaces";
import Modal from "../commons/Modal";
import styles from "./TodoList.module.css";
import TodoTimeBlock from "./TodoTimeblock";

interface TodoListProps {
  todolist: ITodolist;
}

export default function TodoList({ todolist }: TodoListProps) {
  const { eventHandlers } = useContext(HomeworkCtx)!;
  const { deleteTodolist, editTodolistTitle, addTodoTimeblock } = eventHandlers;

  const { value: EditedTitle, onChange: changeEditedTitle } = useInput(
    todolist.title
  );
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);

  const {
    value: timeblockTitle,
    onChange: changeTimeblockTitle,
    resetValue: resetTimeblockTitle,
  } = useInput("");
  const { isModalOpened, openModal, closeModal } = useModal();
  const [selectedValue, setSelectedValue] = useState<string>("daily");

  return (
    <div className={styles.container}>
      <div className={styles["title-container"]}>
        {isEditingTitle ? (
          <>
            <input value={EditedTitle} onChange={changeEditedTitle} />
            <button
              onClick={() => {
                editTodolistTitle(todolist.id, EditedTitle);
                setIsEditingTitle(false);
              }}
            >
              수정 완료
            </button>
          </>
        ) : (
          <>
            <span>{todolist.title}</span>
            <button
              onClick={() => {
                setIsEditingTitle(true);
              }}
            >
              제목 수정
            </button>
          </>
        )}
      </div>

      {todolist.todoTimeblocks.map((timeblock) => (
        <TodoTimeBlock
          key={timeblock.id}
          todoListId={todolist.id}
          {...{ timeblock }}
        />
      ))}

      <div>
        <button
          onClick={() => {
            deleteTodolist(todolist.id);
          }}
        >
          todolist 삭제
        </button>

        <button
          onClick={() => {
            openModal();
          }}
        >
          timeblock 추가
        </button>

        {isModalOpened && (
          <Modal {...{ closeModal }}>
            <>
              <input value={timeblockTitle} onChange={changeTimeblockTitle} />

              <select
                value={selectedValue}
                onChange={(e) => {
                  setSelectedValue(e.target.value);
                }}
              >
                <option value="daily">일간</option>
                <option value="weekly">주간</option>
              </select>

              <button
                onClick={() => {
                  addTodoTimeblock(
                    todolist.id,
                    timeblockTitle,
                    selectedValue === "weekly" ? true : false
                  );

                  // NOTE: 초기화
                  setSelectedValue("daily");
                  resetTimeblockTitle();

                  closeModal();
                }}
              >
                생성
              </button>
            </>
          </Modal>
        )}
      </div>
    </div>
  );
}
