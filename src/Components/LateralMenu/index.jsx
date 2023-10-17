// import React, { useState } from 'react';
// import './style.css';

// const LateralMenu = ({ onMenuClick }) => {
//   const menuItems = [
//     { id: 'inicio', label: 'Inicio' },
//     { id: 'abrir-chamados', label: 'Abrir Chamados' },
//     { id: 'meus-tickets', label: 'Meus Tickets' },
//     { id: 'chamados-recebidos', label: 'Chamados Recebidos' },
//     { id: 'inventario', label: 'Inventário' },
//     { id: 'usuarios', label: 'Usuários' },
//     { id: 'tecnicos', label: 'Técnicos' },
//     { id: 'metricas', label: 'Métricas' },
//   ];

//   const [selectedMenuItem, setSelectedMenuItem] = useState('inicio');

//   const handleMenuClick = (id) => {
//     onMenuClick(id);
//     setSelectedMenuItem(id);
//   };

//   return (
//     <nav>
//       <ul className="Menu">
//         {menuItems.map((menuItem) => (
//           <li
//             key={menuItem.id}
//             className={`Item_Menu${selectedMenuItem === menuItem.id ? '_Selected' : ''}`}
//             onClick={() => handleMenuClick(menuItem.id)}
//           >
//             {menuItem.label}
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default LateralMenu;


import React, { useState, useEffect } from 'react';
import './style.css';
import { useCookies } from 'react-cookie';

const LateralMenu = ({ onMenuClick }) => {
  const menuItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'abrir-chamados', label: 'Abrir Chamados' },
    { id: 'meus-tickets', label: 'Meus Tickets' },
    { id: 'chamados-recebidos', label: 'Chamados Recebidos' },
    { id: 'inventario', label: 'Inventário' },
    { id: 'usuarios', label: 'Usuários' },
    { id: 'metricas', label: 'Métricas' },
  ];

  const [selectedMenuItem, setSelectedMenuItem] = useState('inicio');
  const [cookies] = useCookies(['level']);

  useEffect(() => {
    if (!cookies.level) {
      // Caso o nível não esteja definido nos cookies, você pode tratar isso aqui.
      // Por exemplo, redirecionar o usuário para uma página de login.
    }
  }, [cookies]);

  const handleMenuClick = (id) => {
    onMenuClick(id);
    setSelectedMenuItem(id);
  };

  // Função para verificar se o usuário pode ver a opção do menu com base no nível da conta
  const canSeeMenuItem = (menuItem) => {
    const level = cookies.level;

    if (menuItem.id === 'usuarios' && level < 3) {
      return false; // Não permita que usuários com nível inferior a 1 vejam "Usuários"
    }

    if (menuItem.id === 'metricas' && level < 3) {
      return false; // Não permita que usuários com nível inferior a 2 vejam "Métricas"
    }
    
    if (menuItem.id === 'inventario' && level < 2) {
      return false; // Não permita que usuários com nível inferior a 2 vejam "Métricas"
    }
    
    if (menuItem.id === 'chamados-recebidos' && level < 2) {
      return false; // Não permita que usuários com nível inferior a 2 vejam "Métricas"
    }
    



    // Caso contrário, permita que todos os outros itens sejam visíveis
    return true;
  };

  return (
    <nav>
      <ul className="Menu">
        {menuItems.map((menuItem) => (
          canSeeMenuItem(menuItem) && ( // Verifique se o usuário pode ver esta opção de menu
            <li
              key={menuItem.id}
              className={`Item_Menu${selectedMenuItem === menuItem.id ? '_Selected' : ''}`}
              onClick={() => handleMenuClick(menuItem.id)}
            >
              {menuItem.label}
            </li>
          )
        ))}
      </ul>
    </nav>
  );
};

export default LateralMenu;
