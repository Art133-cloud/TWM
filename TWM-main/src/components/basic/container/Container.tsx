import { ReactNode } from 'react';  // Import ReactNode for typing children
import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;  // Explicitly type the children prop as ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return <div className={styles.container}>{children}</div>;
}

export default Container;
