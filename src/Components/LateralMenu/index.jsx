import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';


import './style.css'



const LateralMenu = () => {

    return (

        <nav>
        <ul className="Menu">
            <li className="Item_Menu_S">Inicio</li>
            <li className="Item_Menu">Abrir Chamados</li>
            <li className="Item_Menu">Meus Tickets</li>
            <li className="Item_Menu">Chamados Recebidos</li>
            <li className="Item_Menu">Inventario</li>
            <li className="Item_Menu">Usarios</li>
            <li className="Item_Menu">Técnicos</li>
            <li className="Item_Menu">Métricas</li>
        </ul>
    </nav>

    );
};
export default LateralMenu;