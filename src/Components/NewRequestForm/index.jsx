import React, { useState } from 'react';
import Input from '../../Components/Input'
import Button from '../../Components/Buttons'
import TextArea from '../../Components/TextArea'
import Label from '../../Components/Labels'
import MessageModal from '../MessageModal';
// import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


import './style.css'



const RequestPageForm = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalCode, setModalCode] = useState('');



  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openMessageModal = (title, message, code, son) => {
    if (!isModalOpen) {
      setModalTitle(title);
      setModalMessage(message);
      setModalCode(code);
      setIsModalOpen(son);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userNameFromCookie = Cookies.get('userName');
    
    // Recupere os valores dos campos diretamente usando getElementById
    const title = document.getElementById('new_request_title').value;
    const description = document.getElementById('new_request_descricao').value;
  
    // Crie um objeto com os dados do formulário
    const requestData = {
      titulo: title || 'Título não especificado', // Valor padrão se title for uma string vazia
      descricao: description || 'Descrição não especificada', // Valor padrão se description for uma string vazia
      cliente: userNameFromCookie
    };
  
    try {
      // Envia os dados para o servidor fictício
      const response = await fetch('http://200.216.165.199:51000/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        if (!userNameFromCookie) {
          console.error('Nome do usuário não encontrado nos cookies.'); 
          openMessageModal("Erro","Sua sessão expirou, refaça o login!"," (002)", true)
          console.log(requestData);
        }
        console.log(requestData);
        // O post foi criado com sucesso
        console.log('Chamado aberto com sucesso!');
        openMessageModal("Sucesso!","Chamado foi aberto, logo será atendido!"," (101)", true)
        // Você pode redirecionar o usuário para outra página ou fazer qualquer outra ação aqui
      } else {
        console.log(requestData);
        console.error('Erro ao abrir chamado.');
        openMessageModal("Erro","Erro não identificado no momento de abertura!"," (003-912)", true)
      }
    } catch (error) {
      console.log(requestData);
      console.error('Erro na solicitação:', error);
    }
  };
  
  
  
    return (


  <div className='request-body'>
    <div className='newrequest-parent'>
        <div className='newrequest-div1'>
            <form className='newrequest-form'>
              <div className='request-title'>
              <Input type="text" id="new_request_title" />
              <Label text="Titulo" id="new_request_title" tipo="padrao" />
              </div>
              <div className='request-desc'>
              <TextArea height='40vh' type="text" id="new_request_descricao" />
              <Label text="Descrição" id="new_request_title" tipo="padrao" />

              </div>
              <div className='request-buttons'>
              <Button text="ENVIAR" type="submit" onClick={handleSubmit} />
              <Button text="LIMPAR" type="submit"  />
              </div>
              
              </form>
              </div>
          </div>
          {isModalOpen && (
            <MessageModal
            isOpen={isModalOpen !== false}
              message={modalMessage}
              title={modalTitle}
              code={modalCode}
              closeModal={closeModal}
            />
          )}
          </div>

    );
};
export default RequestPageForm;