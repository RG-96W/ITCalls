import React from 'react';
import Modal from 'react-modal';
import Button from '../Buttons';
import './style.css';

const MessageModal = ({ message, title, code, closeModal, isOpen }) => {

  return (
    <Modal
      isOpen={isOpen} // Indica se o modal está aberto ou fechado
      onRequestClose={closeModal} // Função a ser chamada ao fechar o modal
      className="modal-content" 
    >
      <div className='BgMessageModal'>
        <div className='Message'>
          <label className="TitleMessage" >{title}</label>
          <label className="MessageMessage" >{message}</label>
          <label className="CodeMessage" >{code}</label>
          <Button text="OK" className="buttons" onClick={closeModal} />
        </div>
      </div>
    </Modal>
  );
};

export default MessageModal;
