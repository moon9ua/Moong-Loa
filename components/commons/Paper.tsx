import styles from "./Paper.module.css";

interface PaperProps {
  children?: any;
  className?: string;

  // width?: string; // NOTE: 되나?
  // height?: string;
  // backgroundColor?: string;
}

export default function Paper({ children, className, ...props }: PaperProps) {
  return (
    <div className={`${className ?? ""} ${styles.paper}`} {...props}>
      {children}
    </div>
  );
}
