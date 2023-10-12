import React, { useState } from 'react';
import TopBar from '../../Components/TopBar';
import LateralMenu from '../../Components/LateralMenu';
import NewRequestTop from '../../Components/NewRequest';
import NewRequest from '../../Components/NewRequestForm';
import SearchTopBar from '../../Components/SearchTopBar/SearchTopBar';
import RequestTopPage from '../../Components/RequestTopPage';
import ListCalls from '../../Components/ListCalls'
import Enviados from '../../Components/Atribuidos'
import AtribuidosTecnico from '../../Components/AtribuidosTecnico'
import './style.css';

const Login = () => {
  const [selectedMenu, setSelectedMenu] = useState('inicio');

  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId);
  };

  return (
    <main className="Page">
      <section className="Section1">
        <TopBar />
        <LateralMenu onMenuClick={handleMenuClick} />
      </section>

      <section className="Section2">
        <SearchTopBar />

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
            <Enviados />
            {/* <NewRequest /> */}
          </div>
        )}

        {selectedMenu === 'chamados-recebidos' && (
          /* Conteúdo para a guia "Abrir Chamados" */
          <div className='ListCalls2'>
            {/* Conteúdo da guia "Abrir Chamados" */}
            <AtribuidosTecnico />
            {/* <NewRequest /> */}
          </div>
        )}

        {/* Adicione mais blocos de conteúdo para outros menus, se necessário. */}

      </section>
    </main>
  );
};

export default Login;
