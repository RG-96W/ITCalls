import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Button from '../../Components/RequestModal/button';
import MessageModal from '../MessageModal';
import ConfirmacaoModal from '../ConfirmacaoModal'; // Certifique-se de importar o ConfirmacaoModal
import './style.css';

const Atribuidos = () => {
  const [chamados, setChamados] = useState([]);
  const [userName, setUserName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const chamadosPerPage = 6;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const [chamadoAReabrir, setChamadoAReabrir] = useState(null);

  const [isConfirmacaoModalOpen, setIsConfirmacaoModalOpen] = useState(false); // Declare a variável isConfirmacaoModalOpen

  const [chamadosSelect, setChamadosSelect] = useState([]);

  const [novoComentario, setNovoComentario] = useState([]);
  const [novoStatus, setNovoStatus] = useState([]);
  const [fechamento, setFechamento] = useState([]);
  const [novoFCR, setNovoFCR] = useState([]);

  const [atualRequest, setAtualRequest] = useState(null);

  // Declare a função openConfirmacaoModal
  const openConfirmacaoModal = (title, message, son, actionOnConfirm) => {
    if (!isConfirmacaoModalOpen) {
      setModalTitle(title);
      setModalMessage(message);
      setActionOnConfirm(actionOnConfirm);
      setIsConfirmacaoModalOpen(son);
    }
  };

  // Declare a variável actionOnConfirm
  const [actionOnConfirm, setActionOnConfirm] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openMessageModal = (title, message, son) => {
    if (!isModalOpen) {
      setModalTitle(title);
      setModalMessage(message);
      setIsModalOpen(son);
    }
  };

  useEffect(() => {
    // Recupere o nome do usuário do cookie
    const userNameFromCookie = Cookies.get('userName');

    if (userNameFromCookie) {
      setUserName(userNameFromCookie);
    }

    // Fazer uma solicitação HTTP GET para obter os chamados do servidor usando fetch
    fetch('http://200.216.165.199:51000/requests')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao obter os chamados');
        }
        return response.json();
      })
      .then((data) => {
        const chamadosDoUsuario = data.filter((chamado) => chamado.cliente === userName);
        setChamados(chamadosDoUsuario);
      })
      .catch((error) => {
        console.error('Erro ao obter os chamados:', error);
      });
  }, [userName]);

  // Função para determinar a cor do texto com base no status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Novo':
        return 'green';
      case 'Atendimento':
        return 'blue';
      case 'Bloqueado':
        return 'red';
      default:
        return 'black'; // Cor padrão
    }
  };

  // Função para navegar para a próxima página
  const nextPage = () => {
    if (currentPage < Math.ceil(chamados.length / chamadosPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Função para navegar para a página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };






  // Calcular os índices dos chamados na página atual
  const indexOfLastChamado = currentPage * chamadosPerPage;
  const indexOfFirstChamado = indexOfLastChamado - chamadosPerPage;
  const currentChamados = chamados.slice(indexOfFirstChamado, indexOfLastChamado);

  const handleReabrirChamado = () => {
    console.log("Função handleReabrirChamado chamada.");
    console.log("Chamado recebido para reabertura:", chamadosSelect.titulo);
    setNovoComentario(chamadosSelect._id)

    if (chamadosSelect) {
      // 1. Atualize o estado chamadosSelect para null para redefinir a seleção.
      


      setNovoFCR(chamadosSelect.FCR + 1)
      setNovoStatus("Reaberto")
      setFechamento("")
      console.log(chamadosSelect._id)
      fetch(`http://200.216.165.199:51000/requests/${novoComentario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "comentarios": [
              {
                "texto": "Chamado reaberto pelo autor."
              }
            ],
          FCR: novoFCR,
          status: novoStatus,
          data_fechamento: fechamento,
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
    } else {
      console.log("Chamado não existe. Falha na reabertura.");
    }
  };

  return (
    <div className="meuschamadosa">
      <div className="meuschamadosgrid">
        {currentChamados.map((chamado, index) => (
          <div className={`meuchamado meuchamado${index + 1}`} key={chamado._id}>
            <div className="chamadobox">
              <div className="boxtitulo">
                {chamado.titulo}
              </div>
              <div className="boxdescricao">
                {chamado.descricao}
              </div>
              <div className="status3">
                <div className="chamadostatus1" style={{ color: getStatusColor(chamado.status) }}>
                  {chamado.status}
                </div>
                {chamado.status === 'Fechado' ? (
                <Button
                  text="Reabrir"
                  className="breabrir"
                  type="submit"
                  onClick={() => {
                    openConfirmacaoModal(
                      "Confirmação",
                      "Tem certeza que deseja reabrir este chamado?",
                      true,
                      () => setChamadosSelect(chamado)
                    );
                  }}
                />
                ) : (
                  <Button text="Saber Mais" className="beditar" type="submit" onClick={() => openMessageModal("Ops...", "Esta página está em construção!", true)} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination" id="pagination">
        <button id="prevPage" onClick={prevPage}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="#FF9F1C" d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg></button>
        <span id="currentPage">{currentPage}</span>
        <button id="nextPage" onClick={nextPage}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="#FF9F1C" d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" /></svg></button>
      </div>
      {isModalOpen && (
        <MessageModal
          isOpen={isModalOpen !== false}
          message={modalMessage}
          title={modalTitle}
          closeModal={closeModal}
        />
      )}
      {isConfirmacaoModalOpen && (
        <ConfirmacaoModal
  isOpen={isConfirmacaoModalOpen}
  chamadoAReabrir={chamadoAReabrir}
  actionOnConfirm={handleReabrirChamado}
  closeModal={() => setIsConfirmacaoModalOpen(false)}
/>
      )}
    </div>
  );
};

export default Atribuidos;