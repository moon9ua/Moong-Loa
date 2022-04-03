import styles from "./Button.module.css";

interface ButtonProps {
  label: string;
}

export default function Button({ label, ...props }: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      {label}
    </button>
  );
}
