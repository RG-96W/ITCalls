import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import Button from './button';
import './style.css';

Modal.setAppElement('#root');

const RequestModal = ({ isOpen, onRequestClose, chamadoId }) => {
  const [atualRequest, setAtualRequest] = useState(null);
  const [progresso, setProgresso] = useState(0);
  const progressoRef = useRef(progresso);

  useEffect(() => {
    if (chamadoId) {
      fetch(`http://127.0.0.1:5001/requests/${chamadoId}`)
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
        });
    }
  }, [chamadoId]);

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
                <Button text="Solucionado" className="bsolucionado" type="submit" />
              </div>
              <div className="bu2">
                <Button text="Bloqueado" className="bbloqueado" type="submit" />
              </div>
              <div className="bu3">
                <Button text="Editar" className="beditar" type="submit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RequestModal;
