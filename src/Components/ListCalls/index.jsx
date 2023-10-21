import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import RequestModal from '../RequestModal'; // Importe o componente do modal
import MessageModal from '../MessageModal';
import './style.css';

const ListCalls = () => {
  const [chamados, setChamados] = useState([]);
  const [selectedChamadoId, setSelectedChamadoId] = useState(null); // Estado para controlar o ID do chamado selecionado
  // const navigate = useNavigate();

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


  const handleChamadoClick = (chamadoId) => {
    setSelectedChamadoId(chamadoId); // Abre o modal quando um chamado é clicado
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Novo':
        return 'status-novo'; // Adicione a classe "status-novo" no seu arquivo CSS
      case 'Em Atendimento':
        return 'status-em-atendimento'; // Adicione a classe "status-em-atendimento" no seu arquivo CSS
      case 'Bloqueado':
        return 'status-bloqueado'; // Adicione a classe "status-bloqueado" no seu arquivo CSS
      default:
        return '';
    }
  };

  useEffect(() => {
    // Fazer uma solicitação HTTP GET para obter os chamados do servidor usando fetch
    fetch('http://200.216.165.199:51000/requests')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao obter os chamados');
        }
        return response.json();
      })
      .then((data) => {
        setChamados(data);
      })
      .catch((error) => {
        console.error('Erro ao obter os chamados:', error);
        openMessageModal("Erro","Erro ao obter resposta do servidor de chamados!"," (001-908)", true)
      });
  }, []);

  return (
    <div className="ListCalls">
      <table>
        <thead>
          <tr className="CallsRef">
            <th className="tab1">ID</th>
            <th className="tab2">TÍTULO</th>
            <th className="tab3">STATUS</th>
            <th className="tab4">TÉCNICO</th>
            <th className="tab5">REQUERENTE</th>
            <th className="tab6">VENCIMENTO</th>
          </tr>
        </thead>
        <tbody>
        {chamados
    .filter(chamado => chamado.status !== "Fechado") // Filtra os chamados com status diferente de "Fechado"
    .map((chamado) => (
      <tr
        key={chamado._id}
        onClick={() => handleChamadoClick(chamado._id)}
      >
              <td className="tab1">{chamado.id_interno}</td>
              <td className="tab2">{chamado.titulo}</td>
              <td className={`tab3 ${getStatusColor(chamado.status)}`}>
                  {chamado.status}
                </td>
              <td className="tab4">{chamado.responsavel}</td>
              <td className="tab5">{chamado.cliente}</td>
              <td className="tab6">{chamado.data_previsao}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
            <MessageModal
            isOpen={isModalOpen !== false}
              message={modalMessage}
              title={modalTitle}
              code={modalCode}
              closeModal={closeModal}
            />
          )}
      <RequestModal
        isOpen={selectedChamadoId !== null}
        onRequestClose={() => setSelectedChamadoId(null)} // Fecha o modal quando o usuário clica fora dele
        chamadoId={selectedChamadoId}
      />
    </div>
  );
};

export default ListCalls;
