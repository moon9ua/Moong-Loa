import { ChangeEvent } from "react";
import styles from "./Input.module.css";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;

  noBox?: boolean;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  fontSize?: string;
}

export default function Input({ noBox, fontSize, ...props }: InputProps) {
  const className = noBox ? styles["no-box"] : styles.input;

  return <input className={className} style={{ fontSize }} {...props} />;
}
