import styles from "./MenuItem.module.css";

interface MenuItemProps {
  children?: any;
  onClick: () => void;
}

export function MenuItem({ children, onClick }: MenuItemProps) {
  return (
    <li className={styles.li}>
      {/* <button onClick={onClick}>{children}</button> */}
      <button onMouseDown={onClick}>{children}</button>
    </li>
  );
}
