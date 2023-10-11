import React, { useState } from 'react';
import './style.css';

const LateralMenu = ({ onMenuClick }) => {
  const menuItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'abrir-chamados', label: 'Abrir Chamados' },
    { id: 'meus-tickets', label: 'Meus Tickets' },
    { id: 'chamados-recebidos', label: 'Chamados Recebidos' },
    { id: 'inventario', label: 'Inventário' },
    { id: 'usuarios', label: 'Usuários' },
    { id: 'tecnicos', label: 'Técnicos' },
    { id: 'metricas', label: 'Métricas' },
  ];

  const [selectedMenuItem, setSelectedMenuItem] = useState('inicio');

  const handleMenuClick = (id) => {
    onMenuClick(id);
    setSelectedMenuItem(id);
  };

  return (
    <nav>
      <ul className="Menu">
        {menuItems.map((menuItem) => (
          <li
            key={menuItem.id}
            className={`Item_Menu${selectedMenuItem === menuItem.id ? '_Selected' : ''}`}
            onClick={() => handleMenuClick(menuItem.id)}
          >
            {menuItem.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LateralMenu;
