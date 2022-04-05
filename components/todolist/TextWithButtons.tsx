import { useState } from "react";
import useInput from "../../hooks/useInput";
import Button from "../commons/Button";
import Input from "../commons/Input";
import Menu from "../commons/Menu";
import { MenuItem } from "../commons/MenuItem";
import styles from "./TextWithButtons.module.css";

interface TextWithButtons {
  initialInput: string;

  editFunc: (inputValue: string) => void;
  editLabel?: string;
  deleteFunc: () => void;
  deleteLabel?: string;

  addFunc?: () => void;
  addLabel?: string;

  fontSize?: string;
}

export default function TextWithButtons({
  initialInput,
  editFunc,
  editLabel,
  deleteFunc,
  deleteLabel,
  addFunc,
  addLabel,
  fontSize = "16px",
}: TextWithButtons) {
  const { value, onChange } = useInput(initialInput);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      editFunc(value);
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.container} style={{ fontSize }}>
      {isEditing ? (
        <Input {...{ value, onChange, onKeyUp, fontSize }} noBox />
      ) : (
        <>
          <span>{value}</span>

          <Menu isIcon>
            {addFunc && (
              <MenuItem onClick={addFunc}>{addLabel ?? "추가"}</MenuItem>
            )}

            <MenuItem
              onClick={() => {
                setIsEditing(true);
              }}
            >
              {editLabel ?? "수정"}
            </MenuItem>

            <MenuItem onClick={deleteFunc}>{deleteLabel ?? "삭제"}</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
}
