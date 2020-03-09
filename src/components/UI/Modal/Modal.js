import React from 'react';
import styles from './Modal.module.css';

class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.show !== this.props.show) || (nextProps.children !== this.props.show);
  }
  render() {
    return (
      <div
      style={{
        opacity: this.props.show ? 1 : 0,
        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)'
      }}
      className={styles.Modal}>
      {this.props.children}
    </div>
    );
  }
}

export default Modal;