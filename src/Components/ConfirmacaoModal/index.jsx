import React from 'react';
import Modal from 'react-modal';
import Button from '../Buttons';
import './style.css';

const ConfirmacaoModal = ({ message, title, code, actionOnConfirm, isOpen, closeModal }) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal-content"
    >
      <div className="BgMessageModal">
        <div className="Message">
          <label className="TitleMessage">{title}</label>
          <label className="MessageMessage">{message}</label>
          {code && <label className="CodeMessage">{code}</label>}
          <Button
  text="Sim"
  className="buttons"
  onClick={() => {
    if (typeof actionOnConfirm === 'function') {
      actionOnConfirm(); // Verifique se actionOnConfirm é uma função antes de chamar
    }
    closeModal();
  }}
/>
          <Button text="Não" className="buttons" onClick={closeModal} />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmacaoModal;
