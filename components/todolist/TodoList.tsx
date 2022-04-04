import {
  faPlusSquare,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCirclePlus,
  faPen,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import useInput from "../../hooks/useInput";
import useModal from "../../hooks/useModal";
import { HomeworkCtx } from "../../pages/homework";
import { ITodolist } from "../../pages/homework/interfaces";
import Button from "../commons/Button";
import Input from "../commons/Input";
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

  const onKeyUpEditTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      editTodolistTitle(todolist.id, EditedTitle);
      setIsEditingTitle(false);
    }
  };
  const onClickEditTitle = () => {
    setIsEditingTitle(true);
  };
  const onClickDeleteTodoList = () => {
    deleteTodolist(todolist.id);
  };

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["title-container"]}>
          {isEditingTitle ? (
            <Input
              value={EditedTitle}
              onChange={changeEditedTitle}
              onKeyUp={onKeyUpEditTitle}
              noBox
            />
          ) : (
            <>
              <span>{todolist.title}</span>

              <div>
                <Button onClick={onClickEditTitle} noBox icon="edit" />
                <Button onClick={onClickDeleteTodoList} noBox icon="delete" />
              </div>
            </>
          )}
        </div>

        <div className={styles["timeblocks-container"]}>
          {todolist.todoTimeblocks.map((timeblock) => (
            <TodoTimeBlock
              key={timeblock.id}
              todoListId={todolist.id}
              {...{ timeblock }}
            />
          ))}
        </div>

        <Button onClick={openModal} noBox icon="add" />
      </div>

      {isModalOpened && (
        <Modal {...{ closeModal }}>
          <>
            <Input value={timeblockTitle} onChange={changeTimeblockTitle} />

            <select
              value={selectedValue}
              onChange={(e) => {
                setSelectedValue(e.target.value);
              }}
              className={styles.select}
            >
              <option value="daily">일간</option>
              <option value="weekly">주간</option>
            </select>

            <Button
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
            </Button>
          </>
        </Modal>
      )}
    </>
  );
}
