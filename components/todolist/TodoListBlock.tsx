import Button from "../commons/Button";
import styles from "./TodoListBlock.module.css";
import UnitOfTimeBlock from "./UnitOfTimeBlock";

export default function TodoListBlock() {
  return (
    <div className={styles.container}>
      <div className={styles["title-container"]}>
        <span>Todo-List</span>
        <Button label="제목 수정" />
      </div>

      <UnitOfTimeBlock />
      <UnitOfTimeBlock weekly />
      <UnitOfTimeBlock />

      <div>
        <Button label="일간 리스트 추가" />
        <Button label="주간 리스트 추가" />
      </div>
    </div>
  );
}

/* NOTE:
 * button 간단하게 변경 (아이콘 등으로) + hover시 안내 popup
 */
