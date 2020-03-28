import React from 'react';
import useHttpClient from '../../hooks/http-error-handler';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';


const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, errorConfirmedHandler] =  useHttpClient(axios);

    return (
      <>
        <Backdrop show={error} closeModal={errorConfirmedHandler} />
        <Modal show={error}>
          {error && error.message}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  }
}

export default withErrorHandler;