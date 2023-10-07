import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Button from './button';

import './style.css';

Modal.setAppElement('#root'); // Define o elemento raiz da sua aplicação

const RequestModal = ({ isOpen, onRequestClose, chamadoId }) => {
  const [atualRequest, setAtualRequest] = useState(null);

  useEffect(() => {
    if (chamadoId) {
      // Fazer uma solicitação HTTP GET para obter os detalhes do chamado usando o chamadoId
      fetch(`http://127.0.0.1:5001/requests/${chamadoId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao obter os detalhes do chamado');
          }
          return response.json();
        })
        .then((data) => {
          setAtualRequest(data);
        })
        .catch((error) => {
          console.error('Erro ao obter os detalhes do chamado:', error);
        });
    }
  }, [chamadoId]);

  if (!atualRequest) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="request-modal"
    >
      <div className="bodymodal">

<div className="bodymodal">
    <div className="request">
        <div className="parent">


        <div className="div1">
  <div className="titulo">
    Título: {atualRequest.titulo} {/* Use atualRequest.titulo, não atualRequest.title */}
  </div>
  <div className="descricao">
    Descrição: {atualRequest.descricao} {/* Use atualRequest.descricao, não atualRequest.description */}
  </div>
</div>

<div className="div2">
  <div className="comentariostitulo">
    Respostas
  </div>
  <div className="comentarios">
    {atualRequest.comentarios} {/* Use atualRequest.comentarios, não atualRequest.comments */}
  </div>
</div>

<div className="div3">
  <div className="infosRequest">
    <div className="status">Status: {atualRequest.status}</div>
    <div className="tecnico">Técnico: {atualRequest.responsavel}</div> {/* Use atualRequest.responsavel, não atualRequest.technician */}
    <div className="solicitante">Solicitante: {atualRequest.cliente}</div> {/* Use atualRequest.cliente, não atualRequest.customer */}
    <div className="abertura">Abertura: {atualRequest.data_abertura}</div> {/* Use atualRequest.data_abertura, não atualRequest.open_date */}
    <div className="vencimento">Vencimento: {atualRequest.data_previsao}</div> {/* Use atualRequest.data_previsao, não atualRequest.dbvencimento */}
    <div className="prioridade">Prioridade: {atualRequest.prioridade}</div>
  </div>
</div>

            <div className="div4">
                <div className="GridButtons">
                    <div className="button1">
                    <Button text="Solucionado" className="bsolucionado" type="submit" />
                    {/* onClick={handleSubmit}  */}
                    </div>
                    <div className="button2">
                    <Button text="Responder" className="bcomentario" type="submit" />
                    </div>
                    <div className="button3">
                    <Button text="Bloqueado" className="bbloqueado" type="submit" />
                    </div>
                    <div className="button4">
                    <Button text="Editar" className="beditar" type="submit" />
                    </div>
                    </div>
                </div>


            </div>
    </div>
</div>
      </div>
    </Modal>
  );
};

export default RequestModal;
