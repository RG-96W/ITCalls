import React, { useState } from 'react';
import TopBar from '../../Components/TopBar';
import LateralMenu from '../../Components/LateralMenu';
import NewRequestTop from '../../Components/NewRequest';
import NewRequest from '../../Components/NewRequestForm';
import SearchTopBar from '../../Components/SearchTopBar/SearchTopBar';
import RequestTopPage from '../../Components/RequestTopPage';
import ListCalls from '../../Components/ListCalls';
import Enviados from '../../Components/Atribuidos';
import AtribuidosTecnico from '../../Components/AtribuidosTecnico';
import Abertos from '../../Components/MeusTicketsTop';
import Atribuidos from '../../Components/AtribuidosAMim';
import Users from '../../Components/ListUsers';
import './style.css';

const Login = () => {
  const [selectedMenu, setSelectedMenu] = useState('inicio');
  const [isButtonClicked, setIsButtonClicked] = useState(false);



  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId);
  };

  const handleMenuClickShow = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  return (
    <main className="Page">
      <section className={`Section1 ${isButtonClicked ? 'section1show' : ''}`}>
        <TopBar />
        <LateralMenu onMenuClick={handleMenuClick} />
      </section>

      <section className="Section2">
        <SearchTopBar />

        <div className="show_menu" onClick={handleMenuClickShow}>
          {/* Ícone do menu para dispositivos móveis */}
          <i className="fas fa-bars">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="40">
            <path fill="#FF9F1C" d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
          </i>
        </div>


        {selectedMenu === 'inicio' && (
          /* Conteúdo para a guia "Inicio" */
          <div className='ListCalls2'>
            {/* Conteúdo da guia "Inicio" */}
            <RequestTopPage />
            <ListCalls />
          </div>
        )}

        {selectedMenu === 'abrir-chamados' && (
          /* Conteúdo para a guia "Abrir Chamados" */
          <div>
            {/* Conteúdo da guia "Abrir Chamados" */}
            <NewRequestTop />
            <NewRequest />
          </div>
        )}

        {selectedMenu === 'meus-tickets' && (
          /* Conteúdo para a guia "Abrir Chamados" */
          <div className='ListCalls2'>
            {/* Conteúdo da guia "Abrir Chamados" */}
            <Abertos />
            <Enviados />
            {/* <NewRequest /> */}
          </div>
        )}

        {selectedMenu === 'chamados-recebidos' && (
          /* Conteúdo para a guia "Abrir Chamados" */
          <div className='ListCalls2'>
            {/* Conteúdo da guia "Abrir Chamados" */}
            <Atribuidos />
            <AtribuidosTecnico />
            {/* <NewRequest /> */}
          </div>
        )}

        {selectedMenu === 'usuarios' && (
          /* Conteúdo para a guia "Abrir Chamados" */
          <div className='ListCalls2'>
            {/* Conteúdo da guia "Abrir Chamados" */}
            <Atribuidos />
            <Users />
            {/* <NewRequest /> */}
          </div>
        )}

        {/* Adicione mais blocos de conteúdo para outros menus, se necessário. */}

      </section>
    </main>
  );
};

export default Login;
