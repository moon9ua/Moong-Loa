import { useContext, useState } from "react";
import useInput from "../../hooks/useInput";
import useModal from "../../hooks/useModal";
import { HomeworkCtx } from "../../pages/homework";
import { ITodolist } from "../../pages/homework/interfaces";
import Button from "../commons/Button";
import Input from "../commons/Input";
import Modal from "../commons/Modal";
import Paper from "../commons/Paper";
import TextWithButtons from "./TextWithButtons";
import styles from "./TodoList.module.css";
import TodoTimeBlock from "./TodoTimeblock";

interface TodoListProps {
  todolist: ITodolist;
}

export default function TodoList({ todolist }: TodoListProps) {
  const { eventHandlers } = useContext(HomeworkCtx)!;
  const { deleteTodolist, editTodolistTitle, addTodoTimeblock } = eventHandlers;

  const {
    value: timeblockTitle,
    onChange: changeTimeblockTitle,
    resetValue: resetTimeblockTitle,
  } = useInput("");
  const { isModalOpened, openModal, closeModal } = useModal();
  const [selectedValue, setSelectedValue] = useState<string>("daily");

  const textWithBtnEdit = (inputValue: string) => {
    editTodolistTitle(todolist.id, inputValue);
  };
  const textWithBtnDelete = () => {
    deleteTodolist(todolist.id);
  };

  return (
    <div>
      <Paper className={styles["container"]}>
        <TextWithButtons
          initialInput={todolist.title}
          editFunc={textWithBtnEdit}
          deleteFunc={textWithBtnDelete}
          editLabel="리스트 제목 수정"
          deleteLabel="리스트 삭제"
          fontSize="22px"
        />

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
      </Paper>

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
    </div>
  );
}
