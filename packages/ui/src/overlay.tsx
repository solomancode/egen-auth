import { PropsWithChildren } from "react";
import styles from "./overlay.module.css";

interface Props extends PropsWithChildren {
  onClose: () => void;
  open: boolean;
}

export const Overlay = ({ onClose, children, open }: Props) => {
  return (
    <section className={styles.container + " " + (open ? styles.open : "")}>
      <button onClick={onClose} type="button" className={styles.close}>
        ×
      </button>
      {children}
    </section>
  );
};
