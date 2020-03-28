import React from 'react';
import styles from './Modal.module.css';

const Modal = props => {
  return (
    <div
      style={{
        opacity: props.show ? 1 : 0,
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'
      }}
      className={styles.Modal}>
      {props.children}
    </div>
  );
}

export default React.memo(Modal, (prevProps, nextProps) => {
  return ((prevProps.show === nextProps.show) && (!nextProps.show || prevProps.children === nextProps.children));
});