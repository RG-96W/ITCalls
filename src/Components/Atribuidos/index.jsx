import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Button from '../../Components/RequestModal/button';
import MessageModal from '../MessageModal';
import './style.css';

const Atribuidos = () => {
  const [chamados, setChamados] = useState([]);
  const [userName, setUserName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const chamadosPerPage = 6; // Quantidade de chamados por página

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');



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
                <Button text="Saber Mais" className="beditar" type="submit" onClick={() => openMessageModal("Ops...", "Está pagina está em construção!", true)}/>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination" id="pagination">
        <button id="prevPage" onClick={prevPage}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="#FF9F1C" d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg></button>
        <span id="currentPage">{currentPage}</span>
        <button id="nextPage" onClick={nextPage}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="#FF9F1C" d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg></button>
      </div>
      {isModalOpen && (
            <MessageModal
            isOpen={isModalOpen !== false}
              message={modalMessage}
              title={modalTitle}
              closeModal={closeModal}
            />
          )}
    </div>
  );
};

export default Atribuidos;
