import { useState } from "react";
import Button from "../commons/Button";
import styles from "./TodoList.module.css";
import TodoTimeBlock from "./TodoTimeblock";

export default function TodoList() {
  return (
    <div className={styles.container}>
      <div className={styles["title-container"]}>
        <span>Todo-List</span>
        <Button label="제목 수정" />
      </div>

      <TodoTimeBlock />
      <TodoTimeBlock weekly />
      <TodoTimeBlock />

      <div>
        <Button label="일간 리스트 추가" />
        <Button label="주간 리스트 추가" />
      </div>
    </div>
  );
}
