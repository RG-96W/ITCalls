import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import Button from './button';
import MessageModal from '../MessageModal';
import './style.css';
import Cookies from 'js-cookie';

Modal.setAppElement('#root');

const RequestModal = ({ isOpen, onRequestClose, chamadoId }) => {
  const [atualRequest, setAtualRequest] = useState(null);
  const [progresso, setProgresso] = useState(0);
  const [comentarioModalIsOpen, setComentarioModalIsOpen] = useState(false);
  const [comentarioBModalIsOpen, setComentarioBModalIsOpen] = useState(false);
  const progressoRef = useRef(progresso);
  const [userName, setUserName] = useState('');

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

  useEffect(() => {

    // Recupere o nome do usuário do cookie

    if (chamadoId) {
      fetch(`http://200.216.165.199:51000/requests/${chamadoId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao obter os detalhes do chamado');
          }
          return response.json();
        })
        .then((data) => {
          setAtualRequest(data);
          const totalMilissegundos = new Date(data.data_previsao) - new Date(data.data_abertura);
          const milissegundosDecorridos = new Date() - new Date(data.data_abertura);
          let novoProgresso = (milissegundosDecorridos / totalMilissegundos) * 100;

          // Verifique se o progresso não ultrapassa 100%
          novoProgresso = Math.min(novoProgresso, 100);

          setProgresso(novoProgresso);
          progressoRef.current = novoProgresso;
        })
        .catch((error) => {
          console.error('Erro ao obter os detalhes do chamado:', error);
          openMessageModal("Erro", "Erro ao localizar chamado!", " (003-909)", true)
        });
    }
  }, [chamadoId]);

  useEffect(() => {
    // Recupere o nome do usuário do cookie
    const userNameFromCookie = Cookies.get('userName');

    if (userNameFromCookie) {
      setUserName(userNameFromCookie);
    }
  }, []);

  if (!atualRequest) {
    return null;
  }

  let cor;
  if (progressoRef.current >= 0 && progressoRef.current <= 25) {
    cor = '#1e8000';
  } else if (progressoRef.current > 25 && progressoRef.current <= 50) {
    cor = '#6d8000';
  } else if (progressoRef.current > 50 && progressoRef.current <= 75) {
    cor = '#805300';
  } else if (progressoRef.current > 75 && progressoRef.current <= 90) {
    cor = '#801300';
  } else {
    cor = '#801300';
  }

  // Função para abrir o modal de comentário
  const handleSolucionadoClick = () => {
    setComentarioModalIsOpen(true);
  };



  const handleBloqueadoClick = () => {
    setComentarioBModalIsOpen(true);
  };


const handleEditarClick = () => {
  openMessageModal("Ops...", "Está pagina está em construção!","", true)
}


  // Função para lidar com o envio do comentário
  const handleComentarioSubmit = () => {
    // Use getElementById para obter o valor do textarea
    const comentarioTexto = document.getElementById('TextAreaS').value;

    // Crie um novo comentário com a data, autor e conteúdo
    const novoComentario = {
      data: new Date(),
      autor: userName, // Substitua pelo nome do autor (se for dinâmico)
      texto: comentarioTexto,
    };

    // Atualize a lista de comentários no chamado atual
    const novosComentarios = [...atualRequest.comentarios, novoComentario];

    // Atualize o status para "Fechado"
    const novoStatus = 'Fechado';

    // Faça uma solicitação PUT para atualizar o chamado no servidor
    fetch(`http://200.216.165.199:51000/requests/${chamadoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comentarios: novosComentarios,
        status: novoStatus,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error('Erro ao atualizar o chamado');
        }
        return response.json();
      })
      .then((data) => {
        // Atualize o estado com o novo chamado
        setAtualRequest(data);
        openMessageModal("Sucesso!", "Status do chamado atualiado para SOLUCIONADO !", " (101)", true)
      })
      .catch((error) => {
        console.error('Erro ao atualizar o chamado:', error);
        openMessageModal("Erro", "Erro ao atualizar chamado!", " (003-911)", true)
      });

    // Fechar o modal de comentário
    setComentarioModalIsOpen(false);
  };

  const handleBloqueadoSubmit = () => {
    // Use getElementById para obter o valor do textarea
    const comentarioTexto = document.getElementById('TextAreaB').value;

    // Crie um novo comentário com a data, autor e conteúdo
    const novoComentario = {
      data: new Date(),
      autor: userName, // Substitua pelo nome do autor (se for dinâmico)
      texto: comentarioTexto,
    };

    // Atualize a lista de comentários no chamado atual
    const novosComentarios = [...atualRequest.comentarios, novoComentario];

    // Atualize o status para "Fechado"
    const novoStatus = 'Bloqueado';

    // Faça uma solicitação PUT para atualizar o chamado no servidor
    fetch(`http://200.216.165.199:51000/requests/${chamadoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comentarios: novosComentarios,
        status: novoStatus,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error('Erro ao atualizar o chamado');
        }
        return response.json();
      })
      .then((data) => {
        // Atualize o estado com o novo chamado
        setAtualRequest(data);
        openMessageModal("Sucesso!", "Status do chamado atualiado para BLOQUEADO !", " (101)", true)
      })
      .catch((error) => {
        console.error('Erro ao atualizar o chamado:', error);
        openMessageModal("Erro", "Erro ao atualizar chamado!", " (003-910)", true)
      });

    // Fechar o modal de comentário
    setComentarioBModalIsOpen(false);
  };




  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="request-modal">
      <div className="bodymodal">
        <div className="request_body">
          <div className="b1">
            <div className="titulorequest">{atualRequest.titulo}</div>
            <div className="descricaorequest">{atualRequest.descricao}</div>
          </div>
          <div className="b2">
            <div className="statusRequest">
              <div className="c1">STATUS</div>
              <div className="c2">{atualRequest.status}</div>
              <div className="c3">TÉCNICO</div>
              <div className="c4">{atualRequest.responsavel}</div>
              <div className="c5">SOLICITANTE</div>
              <div className="c6">{atualRequest.cliente}</div>
              <div className="c7">VENCIMENTO</div>
              <div className="c8">
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${progressoRef.current}%`, backgroundColor: cor }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="b3">
            <div className="buttonss">
              <div className="bu1">
                <Button text="Solucionado" className="bsolucionado" type="button" onClick={handleSolucionadoClick} />
              </div>
              <div className="bu2">
                <Button text="Bloqueado" className="bbloqueado" type="submit" onClick={handleBloqueadoClick} />
              </div>
              <div className="bu3">
                <Button text="Editar" className="beditar" type="submit" onClick={handleEditarClick} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de comentário */}
      <Modal isOpen={comentarioModalIsOpen} onRequestClose={() => setComentarioModalIsOpen(false)} className="comentario-modal">
        <div className='modalSolution'>
          <div className="comentario-modal-body">
            <h2 className="SolucionadoTitle">Comente a Solução!</h2>
            <textarea
              className='TextAreaSoluction'
              id='TextAreaS'
              placeholder="Digite como foi realizada a solução."
            />
            <Button text="Enviar Comentário" className="bbsolucionado" onClick={handleComentarioSubmit} />
          </div>
        </div>
      </Modal>
      {isModalOpen && (
        <MessageModal
          isOpen={isModalOpen !== false}
          message={modalMessage}
          title={modalTitle}
          code={modalCode}
          closeModal={closeModal}
        />
      )}
      <Modal isOpen={comentarioBModalIsOpen} onRequestClose={() => setComentarioBModalIsOpen(false)} className="bloqueado-modal">
        <div className='modalbloqueado'>
          <div className="bloqueado-modal-body">
            <h2 className="bloqueadoTitle">Comente o motivo do Bloqueio!</h2>
            <textarea
              className='TextAreabloqueado'
              id='TextAreaB'
              placeholder="Digite por que foi bloqueado."
            />
            <Button text="Enviar Comentário" className="bbbloqueado" onClick={handleBloqueadoSubmit} />
          </div>
        </div>
      </Modal>
    </Modal>
  );
};

export default RequestModal;
