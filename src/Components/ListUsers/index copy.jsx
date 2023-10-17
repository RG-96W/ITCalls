import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import RequestModal from '../RequestModal'; // Importe o componente do modal
import './style.css';

const ListCalls = () => {
  const [chamados, setChamados] = useState([]);
  const [selectedChamadoId, setSelectedChamadoId] = useState(null); // Estado para controlar o ID do chamado selecionado
  // const navigate = useNavigate();

  const handleChamadoClick = (chamadoId) => {
    setSelectedChamadoId(chamadoId); // Abre o modal quando um chamado é clicado
  };

  useEffect(() => {
    // Fazer uma solicitação HTTP GET para obter os chamados do servidor usando fetch
    fetch('http://127.0.0.1:5001/requests')
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
          {chamados.map((chamado) => (
            <tr
              key={chamado._id}
              onClick={() => handleChamadoClick(chamado._id)}
            >
              <td className="tab1">{chamado.id_interno}</td>
              <td className="tab2">{chamado.titulo}</td>
              <td className="tab3">{chamado.status}</td>
              <td className="tab4">{chamado.responsavel}</td>
              <td className="tab5">{chamado.cliente}</td>
              <td className="tab6">{chamado.data_previsao}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <RequestModal
        isOpen={selectedChamadoId !== null}
        onRequestClose={() => setSelectedChamadoId(null)} // Fecha o modal quando o usuário clica fora dele
        chamadoId={selectedChamadoId}
      />
    </div>
  );
};

export default ListCalls;
