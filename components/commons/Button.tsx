import { faSquarePlus, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.css";

interface ButtonProps {
  // children?: string | JSX.Element;
  children?: any;
  onClick?: () => void;
  noBox?: boolean;
  icon?: "edit" | "delete" | "add";
}

export default function Button({
  children,
  noBox,
  icon,
  ...props
}: ButtonProps) {
  const iconList = {
    add: <FontAwesomeIcon icon={faSquarePlus} />,
    edit: <FontAwesomeIcon icon={faPen} />,
    delete: <FontAwesomeIcon icon={faTrashCan} />,
  };

  return (
    <button className={noBox ? styles["no-box"] : styles.button} {...props}>
      {icon ? iconList[icon] : children}
    </button>
  );
}
