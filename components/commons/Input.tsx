import { ChangeEvent } from "react";
import styles from "./Input.module.css";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;

  noBox?: boolean;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Input({ noBox, ...props }: InputProps) {
  const className = noBox ? styles["no-box"] : styles.input;
  console.log(className);

  return <input className={className} {...props} />;
}
